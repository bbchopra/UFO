// from data.js
var tableData = data;
console.log(tableData.length);

// YOUR CODE HERE!
// fetching the events
var tbody = d3.select("tbody");
var filterbtn = d3.select("#filter-btn");
var clearbtn = d3.select("#clear-btn");
var resetbtn = d3.select("#reset-btn");

//specify the table columns to display
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"];

//function to display data
function populate(dataInput) {
    dataInput.forEach(ufo_sightings => {
        var row = tbody.append("tr");
        columns.forEach(column => row.append("td").text(ufo_sightings[column]))
    });
}

//Show default table at initialize
populate(tableData);

//Creating default dropdown list
//-----------------------
//creating default cities dropdown list
var cities = [];
tableData.forEach(record => {
    if (!(cities.includes(record.city))) {
        cities.push(record.city)
    }
});
var cityMenu = d3.select("#city");
cities.forEach(city=> {
    var item = cityMenu.append("option");
    item.text(city.toUpperCase())
})

//creating default states dropdown list
var states = [];
tableData.forEach(record => {
    if (!(states.includes(record.state))) {
        states.push(record.state)
    }
});
var stateMenu = d3.select("#state");
states.forEach(state=> {
    var item = stateMenu.append("option");
    item.text(state.toUpperCase())
})

//creating default countries dropdown list
var countries = [];
tableData.forEach(record => {
    if (!(countries.includes(record.country))) {
        countries.push(record.country)
    }
});
var countryMenu = d3.select("#country");
countries.forEach(country => {
    var item = countryMenu.append("option");
    item.text(country.toUpperCase())
})

//creating default shapes dropdown list
var shapes = [];
tableData.forEach(record => {
    if (!(shapes.includes(record.shape))) {
        shapes.push(record.shape)
    }
});
var shapeMenu = d3.select("#shape");
shapes.forEach(shape => {
    var item = shapeMenu.append("option");
    item.text(shape.toUpperCase())
});
//-----------------------

//function to re-initialize city and state dropdown
function statecityclearfn(){
    // creating default state dropdown list
    var states = [];
    tableData.forEach(record => {
        if (!(states.includes(record.state))) {
            states.push(record.state)
        }
    });
    //create the dropdown list
    var stateMenu = d3.select("#state");
    stateMenu.html('<option class="optionPlaceholder">ALL</option>')
    states.forEach(state=> {
        var item = stateMenu.append("option");
        item.text(state.toUpperCase())
    });
    
    // creating default city dropdown list
    var cities = [];
    tableData.forEach(record => {
        if (!(cities.includes(record.city))) {
            cities.push(record.city)
        }
    });
    //create the dropdown list
    var cityMenu = d3.select("#city");
    cityMenu.html('<option class="optionPlaceholder">ALL</option>')
    cities.forEach(city=> {
        var item = cityMenu.append("option");
        item.text(city.toUpperCase())
    });
}

//setting global variable to store country selected
var selectedCountry = "all";

// Update state and city dropdown lists based on country selected
countryMenu.on("change", function(){
    // Find the country selected from the dropdown
    selectedCountry = d3.select(this).property("value").toLowerCase();
    console.log(selectedCountry);
    //if "ALL" is selected call function to re-initialize the state and city dropdown lists
    if (selectedCountry === "all") {
        statecityclearfn();
    }
    else {
        //filter the data for country selected
        var tableDataCountry = tableData.filter(record => record.country === selectedCountry);
        // Create a list of states of the selected country
        var states = [];
        tableDataCountry.forEach(record => {
            if (!(states.includes(record.state))) {
                states.push(record.state)
            }
        });
        //update the dropdown list
        var stateMenu = d3.select("#state");
        stateMenu.html('<option class="optionPlaceholder">ALL</option>')
        states.forEach(state => {
            var item = stateMenu.append("option");
            item.text(state.toUpperCase())
        });
        // Create a list of cities of the selected country
        var cities = [];
        tableDataCountry.forEach(record => {
            if (!(cities.includes(record.city))) {
                cities.push(record.city)
            }
        });
        //update the drop down list
        var cityMenu = d3.select("#city");
        cityMenu.html('<option class="optionPlaceholder">ALL</option>')
        cities.forEach(state => {
            var item = cityMenu.append("option");
            item.text(state.toUpperCase())
        });
    }
});    

// Update city dropdown list based on selected state and country
stateMenu.on('change', function(){
    // Find state selected from the dropdown
    var selectedState = d3.select(this).property("value").toLowerCase();
    //if "ALL" is selected, re-initialize the dropdown lists of cities
    if (selectedState === "all") {
        //statecityclearfn();
        console.log("In state All");
        if (selectedCountry !== "all"){
            //var selectedCountry = d3.select(this).property("value").toLowerCase();
            console.log(selectedCountry);
            var tableDataCountry = tableData.filter(record => record.country === selectedCountry);

            // Create a list of cities of the selected country
            var cities = [];
            tableDataCountry.forEach(record => {
                if (!(cities.includes(record.city))) {
                    cities.push(record.city)
                }
            });
            //update the drop down list
            var cityMenu = d3.select("#city");
            cityMenu.html('<option class="optionPlaceholder">ALL</option>')
            cities.forEach(state => {
                var item = cityMenu.append("option");
                item.text(state.toUpperCase())
            });
        }
        else {
            console.log(selectedCountry);
            console.log("Country not selected")
            // creating default city dropdown list
            var cities = [];
            tableData.forEach(record => {
                if (!(cities.includes(record.city))) {
                    cities.push(record.city)
                }
            });
            //create the dropdown list
            var cityMenu = d3.select("#city");
            cityMenu.html('<option class="optionPlaceholder">ALL</option>')
            cities.forEach(city=> {
                var item = cityMenu.append("option");
                item.text(city.toUpperCase())
            });
        }
    }
    else {
        console.log("when state is selected")
        //filter data based on state selected
        var tableDataState = tableData.filter(record => record.state === selectedState);
        // Create a list of cities of selected state
        var cities = [];
        tableDataState.forEach(record => {
            if (!(cities.includes(record.city))) {
                cities.push(record.city)
            }
        });
        //Update the dropdown list
        var cityMenu = d3.select("#city");
        cityMenu.html('<option class="optionPlaceholder">ALL</option>')
        cities.forEach(city => {
            var item = cityMenu.append("option");
            item.text(city.toUpperCase())
        })
    }
});

//filter button even to filter and show data based on selection
filterbtn.on("click", () => {
    d3.event.preventDefault();
    // Add filtered sighting to table
    tbody.html("");
    //fetch the input, selected items
    var inputDate = d3.select("#datetime").property("value").trim();
    console.log(inputDate);
    var inputCountry = d3.select("#country").property("value").toLowerCase();
    console.log(inputCountry);
    var inputState = d3.select("#state").property("value").toLowerCase();
    console.log(inputState);
    var inputCity = d3.select("#city").property("value").toLowerCase();
    console.log(inputCity);
    var inputShape = d3.select("#shape").property("value").toLowerCase();
    console.log(inputShape);

    // copy the whole data to perform filter action while reserving the original data
    var filterData = tableData;  
    //boolean defined to track the filter search
    var searchfound = false;
    //filter the data based on selection
    //condition to check if date is mentioned
    if(inputDate){
        //set boolean to true if date is mentioned
        var searchfound = true;
        //search data for the date mentioned
        filterData = filterData.filter(filterData => filterData.datetime === inputDate);
        console.log(filterData);
        //if no data found for the date mentioned reset tracking boolean to false
        if(filterData.length === 0){
            //reset tracking boolean to false if no data found
            searchfound = false;
        }
    }
    //condition to check if City is selected
    if(inputCity) {
        //set boolean to true if date is mentioned
        searchfound = true;
        //condition to check city selection 
        if (inputCity !== "all") {
            //filter data based on city selected, skip filter if all is selected
            filterData = filterData.filter(filterData => filterData.city === inputCity);
            console.log(filterData);
        }
        //condition to check if data is found after search
        if(filterData.length === 0){
            //reset tracking boolean to false if no data found
            searchfound = false;
        }
    }
    //condition to check if State is selected
    if(inputState) {
        //set boolean to true if date is mentioned
        searchfound = true;
        //condition to check state selection
        if(inputState !== "all") {
            //filter data based on state selected, skip filter if all is selected
            filterData = filterData.filter(filterData => filterData.state === inputState);
        }
        console.log(filterData);
        //condition to check if data is found after search
        if(filterData.length === 0){
            //reset tracking boolean to false if no data found
            searchfound = false;
        }
    }
    //condition to check if Country is selected
    if(inputCountry){
        //set boolean to true if date is mentioned
        searchfound = true;
        //condition to check country selection
        if(inputCountry !== "all"){
            //filter data based on country selected, skip filter if all is selected
            filterData = filterData.filter(filterData => filterData.country === inputCountry);
        }
        console.log(filterData.length);
        //condition to check if data is found after search
        if(filterData.length === 0){
            //reset tracking boolean to false if no data found
            searchfound = false;
        }
    }
    //condition to check if Shape is selected
    if(inputShape){
        //set boolean to true if date is mentioned
        searchfound = true;
        //condition to check city selection
        if(inputShape !== "all"){
            //filter data based on shape selected, skip filter if all is selected
            filterData = filterData.filter(filterData => filterData.shape === inputShape);              
        }
        console.log(filterData.length);
        //condition to check if data is found after search
        if(filterData.length === 0){
            //reset tracking boolean to false if no data found
            searchfound = false;
        }
    }
    //condition to check search tracking boolean
    if(searchfound === false){ 
        //display message if no record found
        tbody.append("tr").append("td").text("No results found!!!");
    }
    else {
        console.log(filterData.length);
        //call function to display data if data is found
        populate(filterData);
    }
    
})

//reset data button event to re-initialize the data and show
resetbtn.on("click", () => {
    tbody.html(""); 
    populate(tableData);
    console.log(tableData.length);
})

//clear filter button event to clear the filter selection
clearbtn.on("click", function(){    
    d3.select("#datetime").property("value","");
    d3.select("#country").property("value","ALL");
    d3.select("#shape").property("value","ALL");
    //call the state and city re-initialize list function else old filter selection is shown
    statecityclearfn();
})