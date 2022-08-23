
//Hide the params box initally
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

//Utility functions
//1.Utility function to get DOM element fom string
 function getElementFromString(string){
   let div =document.createElement("div");
   div.innerHTML= string;
   return div.firstElementChild;
 }

//Initialise number of parameter
let addedParamCount=0;

//If the user clicks on params box ,hide the json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
    document.getElementById("requestJsonBox").style.display = "none";
    document.getElementById("parametersBox").style.display = "block";
});

//If the user clicks on json box ,hide the params box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
    document.getElementById("parametersBox").style.display = "none";
    document.getElementById("requestJsonBox").style.display = "block";
});

//If the user clicks on + button add more parameters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
    let params = document.getElementById("params");
    let string = `<div class="form-row">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount +2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount +2}" placeholder="Enter Parameter ${addedParamCount +2} Key">
                    </div>
                    <div class="col-md-4 my-2">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount +2}" placeholder="Enter Parameter ${addedParamCount +2} Value">
                    </div>
                    <button  class="btn btn-primary deleteParam">-</button>
                  </div>`;

    //Convert the element string to DOM element
    let paramElement=getElementFromString(string);
    params.appendChild(paramElement);

    //Add event listner to delete the parameter when - button is clicked
    let deleteParam=document.getElementsByClassName("deleteParam");
    for(item of deleteParam){
        item.addEventListener("click",(e)=>{
            e.target.parentElement.remove();

        })
    }
     addedParamCount ++; 
})

//If the user clicks on submit button
let submit=document.getElementById("submit");
submit.addEventListener("click",()=>{
   //Show please wait in the response box to request patience from the user
     document.getElementById("responseJsonText").value="Please Wait Fetch API In Progress ..........";

   //Get all the values user has entered
   let url=document.getElementById("url").value;
   let requestType=document.querySelector("input[name=requestType]:checked").value;
   let contentType=document.querySelector("input[name=contentType]:checked").value;

   //If user has clicked params option ,then get all the parameters
   if(contentType== "params"){
       data={};
      for(let i=0;i<addedParamCount +1;i++){
          if(document.getElementById("parameterKey" + (i+1)) != undefined){ 
          let key =document.getElementById("parameterKey" + (i+1)).value;
          let value=document.getElementById("parameterValue" + (i+1)).value;
          data[key] =value;
      }
    }
     data = JSON.stringify(data);  
   }

   else{
   data=document.getElementById("requestJsonText").value;
   }

   //Log all the values in console for debugging
   console.log("url is ",url);
   console.log("requestType is ",requestType);
   console.log("ContentType is ",contentType);
   console.log("Data is ",data);
   
   //If the request type is GET, invoke fetch api to create a GET request
   if(requestType == "GET"){
       fetch(url,{
           method:"GET"
       })
       .then(response=>response.text())
       .then((text)=>{
        document.getElementById("responseJsonText").value=text;
       });
   }
   else{
    fetch(url,{
        method:"POST",
        body:data,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    })
    .then(response=>response.text())
    .then((text)=>{
     document.getElementById("responseJsonText").value=text;
    });
   }
})