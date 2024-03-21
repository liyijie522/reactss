import { selectOptions } from "@app/components/dialog/data";
import { SnipProps } from "@app/components/snip/type";
import { useEffect, useRef, useState } from "react";

function handleSnip(
  ctx: CanvasRenderingContext2D,
  startP: { x: number; y: number },
  endP: { x: number; y: number }
) {
  const imageData = ctx.getImageData(
    startP.x,
    startP.y,
    endP.x - startP.x,
    endP.y - startP.y
  );
  const newCanvas = document.createElement("canvas");
  newCanvas.width = endP.x - startP.x;
  newCanvas.height = endP.y - startP.y;
  newCanvas.getContext("2d")!.putImageData(imageData, 0, 0);
  return newCanvas.toDataURL("image/png");
}

const Snip = ({ img, SnipDatas, drawColor = "blue", onChange }: SnipProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [startP, setStartP] = useState({
    x: 0,
    y: 0,
  });
  const [endP, setEndP] = useState({
    x: 0,
    y: 0,
  });
  const imageRef = useRef<HTMLImageElement | null>(null);

  // 是否显示
  const [isShowOption, setIsShowOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selectOptions[0].value);
  const handleChange = (e: any) => {
    setSelectedOption(e.target.value);
    drawBackground();
    drawSquare();
    drawClass();
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const image = new Image();
    image.src = img;
    image.onload = () => {
      imageRef.current = image;
      drawBackground();
    };

    for (const snipData of SnipDatas) {
      const {
        startP,
        endP,
        class: selectedOption,
        snipImage,
        source,
      } = snipData;

      if (source !== img) continue;

      const image = new Image();
      image.src = snipImage;
      image.onload = () => {
        ctx.strokeStyle = drawColor;
        ctx.beginPath();
        ctx.rect(startP.x, startP.y, endP.x - startP.x, endP.y - startP.y);
        ctx.stroke();
        ctx.fillStyle = drawColor;
        ctx.font = "14px Arial";
        ctx.fillText(
          selectedOption,
          Math.min(startP.x, endP.x),
          Math.min(startP.y, endP.y) - 10
        );
      };
    }
  }, [img, SnipDatas]);

  const drawBackground = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = imageRef.current!.width;
    canvas.height = imageRef.current!.height;
    ctx.drawImage(imageRef.current!, 0, 0);
  };

  const drawSquare = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.strokeStyle = drawColor;
    ctx.beginPath();
    ctx.rect(startP.x, startP.y, endP.x - startP.x, endP.y - startP.y);
    ctx.stroke();
  };

  const drawClass = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = drawColor;
    ctx.font = "14px Arial";
    ctx.fillText(
      selectedOption,
      Math.min(startP.x, endP.x),
      Math.min(startP.y, endP.y) - 10
    );
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setIsDrawing(true);
    setStartP({ x: offsetX, y: offsetY });
    setEndP({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const { offsetX, offsetY } = e.nativeEvent;

    setEndP({ x: offsetX, y: offsetY });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawSquare();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);

    // 阈值
    if (Math.abs(startP.x - endP.x) < 5 || Math.abs(startP.y - endP.y) < 5) {
      console.log("do not draw box, too small area.");
      return;
    }
    setIsShowOption(true);
    drawClass();
  };

  const handleAddNewBox = () => {
    const ctx = canvasRef.current!.getContext("2d")!;
    // 截取图片
    const snipImage = handleSnip(ctx, startP, endP);

    const data = {
      source: img,
      startP,
      endP,
      class: selectedOption,
      snipImage,
    };

    for (const snipData of SnipDatas) {
      if (snipData.snipImage === data.snipImage) {
        return;
      }
    }

    onChange(data);
  };

  return (
    <div>
      {isShowOption && (
        <div className="mb-10">
          <select
            value={selectedOption}
            onChange={handleChange}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled hidden>
              Choose an option
            </option>
            {selectOptions.map(({ label, value }) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>

          <div className="flex align-center justify-between mt-2">
            <button className="w-1/2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded focus:outline-none focus:border-blue-500">
              add new mark
            </button>
            <button
              className="w-1/2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded focus:outline-none focus:border-blue-500"
              onClick={handleAddNewBox}
            >
              add new box
            </button>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default Snip;
