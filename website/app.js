let d = new Date();
let newDate =d.toDateString();

const baseURL="https://api.openweathermap.org/data/2.5/weather?zip=";
const apikey = "&appid=6de7df4d0a32796365906e65b7270aaf";

  //generate button
  document.getElementById('generate').addEventListener('click', DataGenerate);

function DataGenerate(e){
// data from index
const Zip = document.getElementById('zip').value;
const feelData =document.getElementById("feelings").value;

getTemp(Zip)
.then(function (data){


  const Objectweather={date:newDate,temp:data.main.temp,city:data.name,weather:data.weather[0].description,feelData};
  console.log(Objectweather);
  
  Pdata('/addDate', Objectweather);
}).then(function(NewReturn){
    updateUI();

   
})
};

const getTemp = async (Zip)=>{
  const res = await fetch(baseURL+Zip+apikey);
  try {
   const data = await res.json();
      console.log(data);
      return data;
  }
  catch(error){
    console.log("error", error);
    // appropriately handle the error
  }
};

//POOOOOOOOOOOOOOst
const Pdata= async (url = "", Objectweather={})=>{
  const res = await fetch(url,{
    method:'POST',
    credentials:'same-origin',
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify(Objectweather),
  });
  try{
    const NewReturn = await res.json();
    console.log(NewReturn);
    return NewReturn;
  }catch(error){
    console.log(error);
  }
};


const updateUI = async () => {
  const res = await fetch('/all');
  try{
    const allData = await res.json();
    document.getElementById('date').innerHTML = allData.Date
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('city').innerHTML = allData.city;
    document.getElementById('description').innerHTML = allData.weather;
    document.getElementById('content').innerHTML = allData.feelData;

  }catch(error){
    console.log("error", error);
  }
}
