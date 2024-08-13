document.getElementById('employeeForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    let loader = document.getElementById("loader");
    loader.style.display = "block";

    var employName = document.getElementById('employName').value;
    var employSalary = document.getElementById('employSalary').value;
    var employEmail = document.getElementById('employEmail').value.toLowerCase();
    var employMobile = document.getElementById('employMobile').value;
    var employDepartment = document.getElementById('employDepartment').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    console.log(employEmail);
    console.log("anuj");
    var namePattern = /^[A-Za-z\s]+$/;
    var mobilePattern = /^[0-9]{10}$/;
    var salaryPattern = /^\d+(\.\d{1,2})?$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    if (!namePattern.test(employName)) {
        alert("Employee name should only contain letters and spaces.");
        event.preventDefault(); // Prevent form submission
        return;
    }

    if (!salaryPattern.test(employSalary)) {
        alert("Employee salary should only contain digits and one decimal at most.");
        // event.preventDefault(); // Prevent form submission
        return;
    }

    if(!emailPattern.test(employEmail)){
        alert("Please enter valid email address");
        return;
    }

    if (employSalary <= 0 || !/^\d+$/.test(employSalary)) {
        alert("Salary must be a positive number.");
        event.preventDefault(); // Prevent form submission
        return;
    }

    if (!mobilePattern.test(employMobile)) {
        alert("Mobile number must be a 10-digit number.");
        event.preventDefault(); // Prevent form submission
        return;
    }

    let flag = false;
    // Retrieve the employDetail array from local storage
    let employDetail = JSON.parse(localStorage.getItem(employDepartment)) || [];

    employDetail.forEach(element => {
        if(element.employEmail === employEmail){
            flag = true;
            console.log(element.employEmail);
        }
    });
    
    if(!flag){

        function getImageBase64(url, callback) {
            fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = () => callback(reader.result);
                    reader.readAsDataURL(blob);
                })
                .catch(error => console.error('Error:', error));
        }
        
        const imageUrl = `https://avatar.iran.liara.run/public/${gender}`;
    let employGender ;

            getImageBase64(imageUrl, (base64Image) => {
                // Store the image in localStorage
                // localStorage.setItem('savedImage', base64Image);
                employGender = base64Image;

                const employee = {
                    employName,
                    employDepartment,
                    employSalary,
                    employEmail,
                    employMobile,
                    employGender 
                };
                
        

        // Add the new employee details to the array
        employDetail.push(employee);

        // Store the updated array back in local storage
        localStorage.setItem(employDepartment, JSON.stringify(employDetail));

        loader.style.display = "none";
        alert('Employee information stored successfully!');

        document.getElementById('employName').value = "";
        document.getElementById('employSalary').value = "";
        document.getElementById('employEmail').value = "";
        document.getElementById('employMobile').value = "";
        document.getElementById('employDepartment').value = "";
                console.log(employGender);
                console.log('Image saved in localStorage');
            });

    }else{
        loader.style.display = "none";
        alert("user already exist with same email in this department");
    }

});


document.getElementById('employ_btn').addEventListener('click', (e)=>{
    e.preventDefault();

    document.querySelector('.form-container').classList.toggle('hidden');
})

document.getElementById('employ_btn2').addEventListener('click', (e)=>{
    e.preventDefault();

    document.querySelector('.form-container').classList.toggle('hidden');
})

document.getElementById('cancel').addEventListener('click', (e)=>{
    e.preventDefault();

    document.querySelector('.form-container').classList.toggle('hidden');
})

document.querySelector('.nav_menu_btn').addEventListener('click',  (e)=>{
    console.log('clicked');
    document.querySelector('.menu_toggle').classList.toggle('trans');
})
