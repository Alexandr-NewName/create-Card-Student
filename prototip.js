(() => {
    const inputName = document.querySelector('.inputName');
    const inputSurname = document.querySelector('.inputSurname');
    const inputPatronymic = document.querySelector('.inputPatronymic');
    const inputAge = document.querySelector('.inputAge');
    const inputYearStudy = document.querySelector('.inputYearStudy');
    const inputFaculty = document.querySelector('.inputFaculty');

    let studentId = 4
    // let students = []

    function renderStudent(student) {
        return `
            <tr>
                <td>${student.id}</td>
                <td>${student.surname}</td>
                <td>${student.name}</td>
                <td>${student.patronymic}</td>
                <td>${student.ageInput} (${student.age} лет)</td>
                <td>${student.trainingYear}</td>
                <td>${student.faculty}</td>
            </tr>`
    }
    
    function getStudent() {
        const tableBody = document.querySelector('tbody');
        const btn = document.querySelector('.btn');
        const errorMessages = document.querySelector('.error-messages');

        btn.addEventListener('click', (e) => {
            e.preventDefault()
            const errors = [];

            const name = inputName.value.trim();
            const surname = inputSurname.value.trim();
            const patronymic = inputPatronymic.value.trim();
            const ageInput = inputAge.value.trim()
            const yearStudy = inputYearStudy.value.trim()
            const faculty = inputFaculty.value.trim()

            if(!(name && surname && patronymic)){
                errors.push('Name or surname or patronymic is required!')
            }
            if(!ageInput){
                errors.push('Age is required!')
               
            } else {
                const today = new Date()
                const birthday = new Date(ageInput)
                if(birthday > today){
                    errors.push('Дата рождения не может быть в будущем!')
                }
            }
            
            if(!yearStudy){
                errors.push('Year of study is required!')
            } else {
                const today = new Date();
                const yearStudyDate = new Date(yearStudy)
                const minYearStudyDate = new Date('2000-01-01')
                if(yearStudyDate > today){
                    errors.push('Введите корректную дату начала обучения')
                } else if(yearStudyDate < minYearStudyDate){
                    errors.push('Введите корректную дату начала обучения')
                }
            }
            if(!faculty){
                errors.push('Faculty is required!')
            }
            if(errors.length > 0) {
                errorMessages.innerHTML = ''
                errors.forEach((error) => {
                    const p = document.createElement('p')
                    p.textContent = error;
                    errorMessages.appendChild(p)
                })
            } else {
                const today = new Date();
                const birthday = new Date(ageInput)
                let age = today.getFullYear() - birthday.getFullYear();
                const m = today.getMonth() - birthday.getMonth();
                if(m < 0 || (m === 0 && today.getDate() < birthday.getDate())){
                    age--
                }
                let coursInfo = '';
                const yearStudyDate = new Date(yearStudy);
                const startYear = yearStudyDate.getFullYear();
                const endYear = startYear + 4;
                const currentYear = today.getFullYear() ;
                const currentYearMonth = today.getMonth();
                if(currentYear > endYear || (currentYear === endYear && currentYearMonth >= 8)){
                    coursInfo = 'закончил'
                } else {
                    let checkDate = currentYear - startYear;
                    if(currentYearMonth >= 8){
                        checkDate++;
                    }
                    coursInfo = `${checkDate} курс`
                }
                let trainingYear = `${startYear} - ${endYear} (${coursInfo})`


                const student = {
                    id: studentId,
                    name,
                    surname,
                    patronymic,
                    ageInput,
                    age,
                    trainingYear,
                    faculty
                };

                const studentHtml = renderStudent(student)
                tableBody.innerHTML += studentHtml;
                studentId++;

                inputName.value = '';
                inputSurname.value = '';
                inputPatronymic.value = '';
                inputAge.value = '';
                inputYearStudy.value = '';
                inputFaculty.value = '';
                errorMessages.innerHTML = '';
            }
        })
        
    }

    document.getElementById('surname-header').addEventListener('click', () => {
        const tableSurname= document.getElementById('student-table-body');
        const rows = Array.from(tableSurname.querySelectorAll('tr'));

        const sortRows = rows.sort((a, b) => {
            const surnameA = a.cells[1].textContent.trim().toLowerCase();
            const surnameB = b.cells[1].textContent.trim().toLowerCase();
            return surnameA.localeCompare(surnameB);  
        });
        tableSurname.innerHTML = '';
        sortRows.forEach(row => tableSurname.appendChild(row))
    })
    document.getElementById('age-header').addEventListener('click', () => {
        const tableAge= document.getElementById('student-table-body');
        const rows = Array.from(tableAge.querySelectorAll('tr'));
        const sortRows = rows.sort((a, b) => {
            const ageA = parseInt(a.cells[4].textContent.trim());
            const ageB = parseInt(b.cells[4].textContent.trim());
            return ageA - ageB;
        })
        tableAge.innerHTML = '';
        sortRows.forEach(row => tableAge.appendChild(row))
    });
    document.getElementById('enrolled-header').addEventListener('click', () => {
        const tableEnrolled= document.getElementById('student-table-body');
        const rows = Array.from(tableEnrolled.querySelectorAll('tr'));
        const sortRows = rows.sort((a, b) => {
            const enrolledA = a.cells[5].textContent.trim().split('-')[0];
            const enrolledB = b.cells[5].textContent.trim().split('-')[0];
            const dateA = new Date(enrolledA);
            const dateB = new Date(enrolledB);
            return dateA - dateB;
        })
        tableEnrolled.innerHTML = '';
        sortRows.forEach(row => tableEnrolled.appendChild(row))
    })
    document.getElementById('faculty-header').addEventListener('click', () => {
        const tableFaculty = document.getElementById('student-table-body');
        const rows = Array.from(tableFaculty.querySelectorAll('tr'));
        const sortRows = rows.sort((a, b) => {
            const facultyA = parseInt(a.cells[6].textContent.trim());
            const facultyB = parseInt(b.cells[6].textContent.trim());
            return facultyA - facultyB;
        })
        tableFaculty.innerHTML = '';
        sortRows.forEach(row => tableFaculty.appendChild(row))
    })

    const btnFilter = document.querySelector('.filter-button')
    btnFilter.addEventListener('click', (e) => {
        e.preventDefault();
        const filterSurname = document.getElementById('filter-surname').value.toLowerCase().trim();
        const filterStartYear = parseInt(document.getElementById('filter-start-year').value);
        const filterEndYear = parseInt(document.getElementById('filter-end-year').value);
        const filterFaculty = document.getElementById('filter-faculty').value.toLowerCase().trim();
        const tabelBody = document.getElementById('student-table-body');
        const row = Array.from(tabelBody.querySelectorAll('tr'));
        
        row.forEach(row => {
            const surnameCell = row.cells[1].textContent.toLowerCase();
            const startYearCell = parseInt(row.cells[5].textContent.split('-')[0]);
            const endYearCell = parseInt(row.cells[5].textContent.split('-')[1]);
            const facultyCell = row.cells[6].textContent.toLowerCase();

            const matchesSurname = filterSurname === '' || surnameCell.includes(filterSurname);
            const matchesStartYear = isNaN(filterStartYear) || startYearCell === filterStartYear;
            const machesEndYear = isNaN(filterEndYear) || endYearCell === filterEndYear;
            const machesFaculty = filterFaculty === '' || facultyCell.includes(filterFaculty);
            
            if(matchesSurname && matchesStartYear && machesEndYear && machesFaculty){
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        })
    })

    getStudent()
})()

