let isUpdate = false;
let employeePayrollObject = {};
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        // let employeePayrollData =  createEmployeePayroll();
        // createAndUpdateStorage(employeePayrollData);
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e) {
        console.log(e);
    }
}
//------------------------create employee payroll object ----------------------------
const createEmployeePayroll = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if (!id) {
        employeePayrollData.id = createNewEmployeeId();
    }
    else{
        employeePayrollData.id = id;
    }
    setEmployeePayrollData(employeePayrollData);
    // alert("Data added successfully for "+employeePayrollData.name);
    console.log(employeePayrollData.toString());
    return employeePayrollData;
}
const createNewEmployeeId = () => {
    let employeeId = localStorage.getItem('EmployeeId');
    employeeId = !employeeId ? 1 : (parseInt(employeeId)+1);
    localStorage.setItem('EmployeeId', employeeId);
    return employeeId;
}
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if(item.checked){
            setItems.push(item.value);
        }
    });
    return setItems;
}
const setEmployeePayrollData = (employeePayrollData) => {
    try{
        employeePayrollData.name = employeePayrollObject._name;
    }catch(e){
        const nameError = document.querySelector('.name-error');
        nameError.textContent = e;
    }
    employeePayrollData.profile = employeePayrollObject._profile;
    employeePayrollData.gender = employeePayrollObject._gender;
    employeePayrollData.department = employeePayrollObject._department;
    employeePayrollData.salary = employeePayrollObject._salary
    try {
        employeePayrollData.startDate = employeePayrollObject._startDate;
    } catch (e) {
        const dateError = document.querySelector('.date-error');
        dateError.textContent = e;
    }
    employeePayrollData.notes = employeePayrollObject._notes;
} 
//-------------- set employee payroll object ---------------------
const setEmployeePayrollObject = () => {
    employeePayrollObject._name = document.getElementById('name').value;
    employeePayrollObject._profile = document.querySelector('input[name="profile"]:checked').value;
    employeePayrollObject._gender = document.querySelector('input[name="gender"]:checked').value;
    employeePayrollObject._department = getSelectedValues('[name=department]');
    employeePayrollObject._salary = document.getElementById('salary').value;
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const date = day+' '+month+' '+year;
    employeePayrollObject._startDate = date;
    employeePayrollObject._notes = document.getElementById('notes').value;
} 
//-------------- create and update storage ---------------------
const createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let employeePayrollData = employeePayrollList.find(empData => empData._id == employeePayrollObject._id);
        if(!employeePayrollData)
            employeePayrollList.push(createEmployeePayroll());
        else{
            const index = employeePayrollList.map(empData => empData._id).indexOf(employeePayrollData._id);
            employeePayrollList.splice(index, 1, createEmployeePayroll(employeePayrollData._id));
        }
    }
    else{
        employeePayrollList = [createEmployeePayroll()];
    }
    console.log(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}
//-------------- reset form ---------------------
const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setTextValue('.salary-output', '400000');
    setSelectedIndex('#day', 0);
    setSelectedIndex('#month', 0);
    setSelectedIndex('#year', 0);
    setValue('#notes', '');
    setTextValue('.name-error', '');
    setTextValue('.date-error', '');
}
const setValue = (selector, value) => {
    const element = document.querySelector(selector);
    element.value = value;
}
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}
const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)){
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if(item.value === value){
            item.checked = true;
        }
    }) 
}
const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}
const setTextValue = (selector, value) => {
    const element = document.querySelector(selector);
    element.textContent = value;
}