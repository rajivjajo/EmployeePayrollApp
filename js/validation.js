window.addEventListener('DOMContentLoaded', (event) => {
    validateName();
    updateSalaryValue();
    validateStartDate();
    checkForUpdate();
});
const validateName = () => {
    const name = document.querySelector('#name');
    const nameError = document.querySelector('.name-error');
    name.addEventListener('input', function(){
        if(name.value.length == 0){
            nameError.textContent = "Name can't be empty";
            return;
        }
        try{
            (new EmployeePayrollData()).name = name.value;
            nameError.textContent = "";
        }
        catch(e){
            nameError.textContent = e;
        }
    });
}
const updateSalaryValue = () => {
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    salary.addEventListener('input', function(){
        output.textContent = salary.value;
    });
}
const validateStartDate = () => {
    const day = document.querySelector('#day');
    const month = document.querySelector('#month');
    const year = document.querySelector('#year');

    day.addEventListener('input',checkdate);
    month.addEventListener('input',checkdate);
    year.addEventListener('input',checkdate);
}
checkdate = () => {
    const dateError = document.querySelector('.date-error');
    try{
        let date = day.value+" "+month.value+" "+year.value;
        checkStartDate(date);
        dateError.textContent="";
    }
    catch(e)
    {
        dateError.textContent = e;
    }
}
checkStartDate = (date) => {
    let currentDate = new Date();
    let startDate = new Date(date)
    if(startDate > currentDate)
        throw "Start Date is future Date";
    const diff = Math.abs(currentDate.getTime() - startDate.getTime());
    if(diff/(1000*60*60*24)>30)
        throw "Start Date is beyond 30 Days";
}
const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if(!isUpdate) return;
    employeePayrollObject = JSON.parse(employeePayrollJson);
    setForm();
}
const setForm = () => {
    setValue('#name', employeePayrollObject._name);
    setSelectedValues('[name=profile]', employeePayrollObject._profile);
    setSelectedValues('[name=gender]', employeePayrollObject._gender);
    setSelectedValues('[name=department]', employeePayrollObject._department);
    setValue('#salary', employeePayrollObject._salary);
    setTextValue('.salary-output', employeePayrollObject._salary);
    let date = employeePayrollObject._startDate.split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
    setValue('#notes', employeePayrollObject._notes);
}