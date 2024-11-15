(() => {
    const inputName = document.querySelector('.inputName');
    const inputSurname = document.querySelector('.inputSurname');
    const inputPatronymic = document.querySelector('.inputPatronymic');
    const inputAge = document.querySelector('.inputAge');
    const inputYearStudy = document.querySelector('.inputYearStudy');
    const inputFaculty = document.querySelector('.inputFaculty');

    let studentId = 2;

    function renderStudent(student) {
        return `
          <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.surname}</td>
            <td>${student.patronymic}</td>
            <td>${student.age}</td>
            <td>${student.yearOfStudy}</td>
            <td>${student.faculty}</td>
          </tr>
        `;
    }



    function addStudent() {

        const tableBody = document.querySelector('tbody');
        const btn = document.querySelector('.btn');
        const errorMessages = document.querySelector('.error-messages');

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const errors = [];

            const name = document.querySelector('#name').value.trim();
            const surname = document.querySelector('#surname').value.trim();
            const patronymic = document.querySelector('#patronymic').value.trim();
            const age = document.querySelector('#age').value.trim();
            const yearOfStudy = document.querySelector('#yearStudy').value.trim();
            const faculty = document.querySelector('#faculty').value.trim();

            if (!name) {
                errors.push('Name is required')
            }
            if (!surname) {
                errors.push('Surname is required')
            }
            if (!patronymic) {
                errors.push('Patronymic is required')
            }
            if (!birthdate) {
                errors.push('Age is required')
            } else {
                const birthdateParts = birthdate.split('.');
                if (birthdateParts.length !== 3) {
                    errorMessages.push('Invalid birthdate format');
                } else {
                    const day = parseInt(birthdateParts[0]);
                    const month = parseInt(birthdateParts[1]);
                    const year = parseInt(birthdateParts[2]);
                    if (isNaN(day) || isNaN(month) || isNaN(year)) {
                        errorMessages.push('Invalid birthdate format');
                    } else {
                        const birthdateDate = new Date(day, month - 1, year)
                        if (birthdateDate.getFullYear() !== year || birthdateDate.getMonth() !== month - 1 || birthdateDate.getDate() !== day) {
                            errors.push('Invalid birthdate');
                        } else if (birthdateDate < new Date(1900, 0, 1) || birthdateDate > new Date()) {
                            errors.push('Birthdate must be between 01.01.1900 and current date')
                        } else {
                            const age = caclucateAge(birthdateDate);
                            if (age < 0) {
                                errors.push('Invalid age');
                            }
                        }
                    }
                }
            }
            if (!yearOfStudy) {
                errors.push('Year of study is required')
            } else {
                const yearStudy = new Date(yearOfStudy);
                const currentYear = new Date().getFullYear();
                if (yearStudy.getFullYear() < 2000 || yearStudy.getFullYear() > currentYear) {
                    errors.push('Invalid year of study');
                }
            }
            if (!faculty) {
                errors.push('Faculty is required')
            }

            if (errors.length > 0) {
                errorMessages.innerHTML = '';
                errors.forEach((error) => {
                    const p = document.createElement('p');
                    p.textContent = error;
                    errorMessages.appendChild(p)
                })
            } else {
                const student = {
                    id: studentId,
                    name,
                    surname,
                    patronymic,
                    birthdate,
                    age: caclucateAge(new Date(birthdate.split('.').reverse().join('-'))),
                    yearOfStudy,
                    faculty
                };

                const studentHtml = renderStudent(student);
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
        function caclucateAge(birthdate) {
            const today = new Date();
            const age = today.getFullYear() + birthdate.getFullYear();
            const monthDiff = today.getMonth() - today.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
                return age--;
            } else {
                return age;
            }

        }

    }

    addStudent()
})()

