        const questions = [
            {
                question: "ما هو الأمر المستخدم لإنشاء نموذج في VB6؟",
                options: ["Form", "Module", "Class", "Report"],
                answer: "Form"
            },
            {
                question: "ما هي الدالة المستخدمة لقراءة البيانات من ملف نصي؟",
                options: ["Input", "Output", "Read", "Write"],
                answer: "Input"
            },
            {
                question: "ما هي الكلمة المفتاحية المستخدمة لتعريف متغير في VB6؟",
                options: ["Dim", "Var", "Let", "Define"],
                answer: "Dim"
            },
            {
                question: "ما هي الدالة المستخدمة لعرض رسالة على الشاشة؟",
                options: ["Show", "MsgBox", "Alert", "Display"],
                answer: "MsgBox"
            },
            {
                question: "ما هو نوع البيانات المستخدم لتخزين القيم الحقيقية؟",
                options: ["Integer", "String", "Double", "Boolean"],
                answer: "Double"
            }
        ];

        let correctAnswers = questions.map(q => q.answer);

        const container = document.getElementById('quiz-container');
        questions.forEach((q, index) => {
            const questionElement = document.createElement('div');
            questionElement.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
            q.options.forEach(option => {
                questionElement.innerHTML += `
                    <label>
                        <input type="radio" name="question${index}" value="${option}"> ${option}
                    </label><br>
                `;
            });
            container.appendChild(questionElement);
        });

        document.getElementById('submit').onclick = function () {
            const userAnswers = [];
            const questionsDivs = document.querySelectorAll('#quiz-container div');
            questionsDivs.forEach((q, index) => {
                const selected = q.querySelector(`input[name="question${index}"]:checked`);
                userAnswers.push(selected ? selected.value : null);
            });

            let score = 0;
            let feedback = '';
            userAnswers.forEach((answer, index) => {
                if (answer === correctAnswers[index]) {
                    score++;
                } else {
                    feedback += `السؤال ${index + 1}: الإجابة الصحيحة هي "${correctAnswers[index]}".<br>`;
                }
            });

            const message = `نتيجة الاستبيان: ${score} من ${userAnswers.length}\nالإجابات: ${userAnswers.join(', ')}\nملاحظات: ${feedback}`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/218911313949?text=${encodedMessage}`;

            window.open(whatsappURL, '_blank');

            document.getElementById('result').innerHTML = `
                <p>نتيجتك: ${score} من ${userAnswers.length}</p>
                <p class="feedback">${feedback || 'جميع إجاباتك صحيحة!'}</p>
            `;
        };
   
