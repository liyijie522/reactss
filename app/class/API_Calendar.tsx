// type DateEntry = {
//     date: string;
//     image_id: number;
//   };

// //   const requestOptions = {
// //     method: 'GET',
// //     headers: {
// //       'Content-Type': 'application/json',
// //       // Replace 'your-csrf-token' with the actual token
// //       'X-CSRF-Token': '0U46s5G9PYCgSr2fj4yF6XnaqcCaImTk', 
// //       // The Referer header is a standard header and may be set by the browser
// //       'Referer': 'http://192.168.12.37:8000/detect/'
// //     }
// //   };

  
//   class DateService {
//     availableDates: string[] = [];
//     imageIds: number[] = [];
//     disabledDates: string[] = [];
  
//     // constructor() {
//     //   this.fetchDatesAndImages(); // Automatically fetch data when an instance is created
//     // }
  



//     fetchDatesAndImages(): Promise<void> {
//       return fetch('http://192.168.12.37:8000/api/dates/')
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then((data: DateEntry[]) => {
//           // Convert date strings to Date objects
//           this.availableDates = data.map(entry => entry.date);
//           this.imageIds = data.map(entry => entry.image_id);
          
//           console.log("Available Dates:", this.availableDates);
//           console.log("ImageID:", this.imageIds);

        
//             var disableddate;
//           if(this.availableDates.length <= 0) {
//             disableddate = getDisabledDates(availableDates);
//           } else {
//             disableddate = getDisabledDates(availableDates);
//           }

//         });
//     }
  
//     getDisabledDates(availableDates: string[]): string[] {
//         let disabledDates = new Array<string>();
    
//         // search all dates between availableDates[0] and endDate for valid dates
//         const startDate = new Date(availableDates[0]);
//         const endDate = new Date();
//         const currentDate = new Date(startDate);
    
//         while (currentDate <= endDate) {
//           const dateStr = currentDate.toISOString().split('T')[0];
//           if (!this.isValidDate(dateStr, availableDates)) {
//             disabledDates.push(dateStr);
//           }
//           currentDate.setDate(currentDate.getDate() + 1);
//         }
//         console.log("Disabled Dates: " + disabledDates);
//         return disabledDates;
//       }
  
//       isValidDate(date: string, availableDates: string[]): boolean {
//         return availableDates.indexOf(date) !== -1;
//       }


//     getAvailableDatesAsDateObjects(): Date[] {
//         return this.availableDates.map(dateStr => new Date(dateStr));
//       }
    
//       // Function to return disabledDates as Date objects
//       getDisabledDatesAsDateObjects(): Date[] {
//         return this.disabledDates.map(dateStr => new Date(dateStr));
//       }
//   }
  
//   export default DateService;

type DateEntry = {
    date: string;
    image_id: number;
  };

class DatepickerService {
    // availableDates: Date[] = []; // Assuming you want to store these as Date objects
    // imageIds: number[] = [];
    availableDates: Date[] = [];
    availableDates_str: string[] = [];
    imageIds: number[] = [];
    disabledDates: string[] = [];
  
    // Call this method to open the calendar and initialize datepicker
    openCalendar() {
      this.fetchDatesAndImages()
        .then(() => this.initializeDatepicker())
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  
    // Fetch dates and images from the server
    fetchDatesAndImages(): Promise<void> {
    

  
      return fetch('http://192.168.12.37:8000/api/dates/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': 'sessionid=tj4agjpch0deds36wp0ahtr6iiuzxsy9',
            'X-CSRFToken': '0U46s5G9PYCgSr2fj4yF6XnaqcCaImTk',
        },
        
    })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: DateEntry[]) => {
          this.availableDates_str = data.map(entry => entry.date);
          this.imageIds = data.map(entry => entry.image_id);

          this.availableDates = this.getAvailableDatesAsDateObjects();

          console.log("Available date:", this.availableDates_str);
          console.log("Image:",this.imageIds);
        });
    }
  
    // Initialize the datepicker with the fetched data
    initializeDatepicker() {
      // Convert dates to the format expected by your datepicker if needed
      const formattedAvailableDates = this.availableDates.map(date =>
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      );
      const disabledDates = this.getDisabledDates(formattedAvailableDates);
  
      // Assuming jQuery and a datepicker plugin are available
    //   $('#datepicker').datepicker({
    //     format: 'yyyy-mm-dd',
    //     datesDisabled: disabledDates,
    //     startDate: formattedAvailableDates[0],
    //     endDate: new Date().toISOString().split('T')[0],
    //     autoclose: true,
    //     todayHighlight: true,
    //     todayBtn: 'linked',
    //     orientation: 'auto'
    //   }).on('changeDate', e => {
    //     const selectedDateString = e.format();
    //     const selectedDate = new Date(selectedDateString);
    //     const selectedImageId = this.imageIds[this.availableDates.findIndex(
    //       date => date.toISOString().split('T')[0] === selectedDateString
    //     )];
        
    //     console.log(selectedImageId);
    //     if (selectedImageId === undefined) {
    //       alert('No image available for the selected date');
    //     } else {
    //       this.caller(selectedImageId);
    //     }
    //   }).datepicker('show');
    }
  
    // Utility method to get disabled dates based on the availableDates
    getDisabledDates(availableDates: string[]): string[] {
      let disabledDates = new Array<string>();
      const startDate = new Date(availableDates[0]);
      const endDate = new Date();
      let currentDate = new Date(startDate);
  
      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (!availableDates.includes(dateStr)) {
          disabledDates.push(dateStr);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
      return disabledDates;
    }

        getAvailableDatesAsDateObjects(): Date[] {
        return this.availableDates_str.map(dateStr => new Date(dateStr));
      }
    
      // Function to return disabledDates as Date objects
      getDisabledDatesAsDateObjects(): Date[] {
        return this.disabledDates.map(dateStr => new Date(dateStr));
      }
  
    // Dummy method to handle the selected image ID
    caller(imageId: number) {
      // Implement what should happen when an image ID is selected
      console.log(`Selected image ID: ${imageId}`);
    }
  }
  
  export default DatepickerService;