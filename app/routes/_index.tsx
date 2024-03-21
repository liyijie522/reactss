import image1 from "@app/assets/image/image1.jpg";
import image2 from "@app/assets/image/image2.jpg";
import image3 from "@app/assets/image/image3.jpg";
import image4 from "@app/assets/image/image4.jpg";
import image5 from "@app/assets/image/image5.jpg";
import Dialog from "@app/components/dialog";
import { selectOptions } from "@app/components/dialog/data";
import Snip from "@app/components/snip/index";
import { SnipData } from "@app/components/snip/type";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { NavigationBar } from "~/components/header";
import stylesUrl from "~/styles/analytics.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

const images = [
  {
    label: "All Cameras",
    value: image1,
  },
  {
    label: "Camera 2 - Parking",
    value: image2,
  },
  {
    label: "Camera 1 - Combined",
    value: image3,
  },
  {
    label: "Camera 1 - Site Right",
    value: image4,
  },
  {
    label: "Camera 1 - Left Side",
    value: image5,
  },
];

const getFile = (fileName: string) => {
  // @ts-ignore
  return new URL(`../assets/image/${fileName}`, import.meta.url).toString();
};

const isEqual = (a: SnipData, b: SnipData) => {
  return a.snipImage === b.snipImage;
};

export const Index = () => {
  const [image, setImage] = useState(images[0].value);
  const handleChange = function (e: any) {
    setImage(e.target.value);
  };
  const [snipDatas, setSnipDatas] = useState<SnipData[]>([]);
  const handleSnipDatasChange = (newSnipDatas: SnipData) => {
    setSnipDatas([...snipDatas, newSnipDatas]);
  };

  const handleClickSnip = (item: SnipData) => {
    Dialog.alert({
      image: item.snipImage,
      options: selectOptions,
      onDelete: () => {
        setSnipDatas([...snipDatas.filter((i) => !isEqual(i, item))]);

        console.log(snipDatas);
      },
      onUpdate: (v: string) => {
        console.log(v);
        setSnipDatas([
          ...snipDatas.map((i) => {
            if (isEqual(i, item)) {
              return { ...i, class: v };
            }
            return i;
          }),
        ]);

        console.log(snipDatas);
      },
    });
  };

  return (
    <div className="App">
      <NavigationBar />

      <div className="mt-[100px] max-w-[1440px]">
        <h1 className="text-6 text-left font-bold">Detections</h1>
        <div className="mx-100 mt-10 flex justify-between">
          <select
            defaultValue={image}
            className="max-w-50 ring-1 ring-black"
            onChange={(e) => handleChange(e)}
          >
            {images.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
          <p className="ring-1 ring-black p-2 cursor-pointer text-[20px]">
            Select date
          </p>
        </div>

        <div className="mt-8 text-center">
          Detections (Image: 2024-01-30-02-58-02-001.jpg)
        </div>

        <div className="w-200 mt-8 mx-auto">
          <Snip
            img={image}
            SnipDatas={snipDatas}
            onChange={handleSnipDatasChange}
          />
        </div>

        <div className="flex gap-4 mt-8 overflow-x-auto">
          {snipDatas.map((item) => (
            <div
              className="flex-shrink-0 rounded p-1 cursor-pointer hover:bg-gray-200"
              key={item.snipImage}
              onClick={() => handleClickSnip(item)}
            >
              <div className="title font-bold text-[18px]">{item.class}</div>
              {/* <div className="detail">{item.content}</div> */}
              <img className="w-[300px]" src={item.snipImage} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Index;
