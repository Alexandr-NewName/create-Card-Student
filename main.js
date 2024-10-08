(() => {

    const inputName = document.querySelector('.inputName');
    const inputSurname = document.querySelector('.inputSurname');
    const inputPatronymic = document.querySelector('.inputPatronymic');
    const inputAge = document.querySelector('.inputAge');
    const inputYearStudy = document.querySelector('.inputYearStudy');
    const inputFaculty = document.querySelector('.inputFaculty');
    const btn = document.querySelector('.btn');
    const containerCardStudents = document.querySelector('.container-card_students');
    const form = document.querySelector('.student-form');
    const errorMessages = document.querySelector('.error-messages');    

    let arrayStudents = {
        name: '',
        surname: '',
        patronymic: '',
        age:'',
        yearOfStudy: '',
        faculty: ''
    };

    form.addEventListener('submit', (e) => {

        e.preventDefault();
        const errors = [];

        if(!inputName.value.trim()){
            errors.push('Name is required')
        }
        if(!inputSurname.value.trim()){
            errors.push('Surname is required')
        }
        if(!inputPatronymic.value.trim()){
            errors.push('Patronymic is required')
        }
        if(!inputAge.value.trim()){
            errors.push('Age is required')
        } else {
            const ageDate = new Date(inputAge.value)

            if( ageDate < new Date(1900, 0, 1) || ageDate > new Date()){
                errors.push('Invalid age')
            }
        }
        if(!inputYearStudy.value.trim()){
            errors.push('Year of study is required')
        } else {
            const yearStudy = new Date(inputYearStudy.value);
            
            if(yearStudy < new Date(2000, 0, 1) || yearStudy > new Date()) {
                errors.push('Invalid year of study');
            }
        }
        if(!inputFaculty.value.trim()) {
            errors.push('Faculty is required')
        } 

        if (errors.length > 0) {
            errorMessages.innerHTML = '';
            errors.forEach((error) => {
                const p = document.createElement('p');
                p.textContent = error;
                errorMessages.appendChild(p)
            });
        } else {
            const ageDate = new Date(inputAge.value); 
            const today = new Date();
            let age = today.getFullYear() - ageDate.getFullYear(); 
            const m = today.getMonth() - ageDate.getMonth();

            if (m < 0 || (m === 0 && today.getDate() < ageDate.getDate())) {
                age--;
            }

            // const studyYear = new Date(inputYearStudy.value);
            // const roundingUpYear = today.getFullYear() - studyYear.getFullYear();  
            // const yearStudy = `${studyYear.getFullYear()}-${today.getFullYear()}`
            // let coursNumber;
            // if(roundingUpYear > 4) {
            //     coursNumber = 'закончил'
            // } else {
            //     coursNumber = `${Math.floor((today.getFullYear() - parseInt(inputYearStudy.value)))}`
            // }
            
            const studyYear = new Date(inputYearStudy.value);
            const startYear = studyYear.getFullYear();
            const startMonth = studyYear.getMonth();
            let courseYear;

            if (startMonth < 8) { 
                courseYear = startYear;
            } else {
                courseYear = startYear + 1;
            }

            const yearStudy = `${courseYear}-${courseYear + 4}`;
            let courseNumber;
            const endDate = new Date(`${courseYear + 4}-09-01`);

            if (endDate < today) {
                courseNumber = 'закончил';
            } else {
                courseNumber = `${Math.floor((today.getFullYear() - courseYear) ) + 1}`;
            }




            
            const div = document.createElement('div');
            div.classList.add('card');
            const h3 = document.createElement('h2');
            h3.classList.add('card-title');
            const p = document.createElement('p');
            p.classList.add('card-date');
            const pStudy = document.createElement('p');
            pStudy.classList.add('card-study');
            const faculty = document.createElement('p');
            faculty.classList.add('card-faculty');
            div.style.width = '300px';
            div.style.border = '1.5px solid white';

            h3.textContent = `${inputName.value} ${inputSurname.value} ${inputPatronymic.value}`;
            p.textContent = `Дата рождения: ${inputAge.value} (${age} лет)`;
            pStudy.textContent = `Начало обучения: ${yearStudy} (${courseNumber} курс) `;
            faculty.textContent = `Факультет: ${inputFaculty.value}`;
            div.appendChild(h3);
            div.appendChild(p);
            div.appendChild(pStudy);
            div.appendChild(faculty);

            containerCardStudents.appendChild(div);


            inputName.value = '';
            inputSurname.value = '';
            inputPatronymic.value = '';
            inputAge.value = '';
            inputYearStudy.value = '';
            inputFaculty.value = '';
            errorMessages.innerHTML = '';
        }

    })

})()

