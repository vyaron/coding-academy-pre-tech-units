const exams = {};
const e = { v: (data) => { if (data && data.id) exams[data.id] = data; } };

e.v({
    id: "tzav-rishon",
    title: "מבחן לדוגמה - צו ראשון",
    description: "מבחן סימולציה מלא להכנה לצו ראשון, הכולל מבחני אנלוגיות, צורנים, הבנת הוראות ומתמטיקה. המבחן מדמה את אופי השאלות במבחן צו ראשון האמיתי.",
    duration: 2700,
    passingGrade: 70,
    totalPoints: 100,
    allowBackNavigation: false,
    showResults: true,
    shuffleQuestions: false,
    shuffleOptions: false,
    questions: [
      {id:"q1",type:"multiple-choice",points:5,question:"קת : רובה",options:["דלק : רכב","אמה : יד","פרעוש : כלב","מרית : מקצף"],correctAnswer:1,explanation:"קת הוא החלק האחורי של הרובה כמו שאמה היא החלק האחורי (התחתון) של היד."},
      {id:"q2",type:"multiple-choice",points:5,question:"דרוּש : צריך",options:["מובן : מסביר","שקוף : רואה","דרוּך : מוכן","מוּכר : מכיר"],correctAnswer:3,explanation:"מישהו שדרוש לו משהו צריך אותו, כמו שמישהו שמוכר לו משהו מכיר אותו."},
      {id:"q3",type:"multiple-choice",points:10,question:"עיניים : ראיה",options:["מצפן : צפון","כנף : עופות","תורן : מפרש","מגלב : הלקאה"],correctAnswer:3,explanation:"עיניים משמשות לראייה כמו שמגלב (שוט/מצליף) משמש להלקאה (הצלפה)."},
      {id:"q4",type:"multiple-choice",points:5,question:"לפקוד : ביקור",options:["לחלום : שינה","לשנן : שיכחה","לאמוד : הערכה","לנסוק : נחיתה"],correctAnswer:2,explanation:"לפקוד היא מילה נרדפת לביקור כמו שלאמוד היא מילה נרדפת להערכה."},
      {id:"q5",type:"multiple-choice",points:5,question:"לדרבן : להתאמץ",options:["להסית : להניא","לדובב : לדבר","לתכנן : לאלתר","להמרות : לציית"],correctAnswer:1,explanation:"לדרבן גורם להתאמץ כמו שלדובב גורם לדבר."},
      {id:"q6",type:"multiple-choice",points:5,question:"מרשי : פרקליטו",options:["עמיתי : יריבו","מפקדי : מפקדו","סבי : נכדו","מעבידי : מעסיקו"],correctAnswer:2,explanation:"פרקליטו של אדם קורא לו מרשי כמו שנכדו של אדם קורא לו סבי."},
      {id:"q7",type:"multiple-choice",points:5,question:"מרוהט : שידה",options:["מסורק : שיער","מיוער : אלון","מגוהץ : קמט","מושחז : סכין"],correctAnswer:1,explanation:"שידה היא חלק ממקום שהוא מרוהט, כמו שאלון הוא חלק ממקום שהוא מיוער."},
      {id:"q8",type:"multiple-choice",points:5,question:"לרדות : כוורת",options:["למסוק : כרם","לפלות : שיער","לקטוף : אדמה","לחצוב : מים"],correctAnswer:1,explanation:"לרדות זו פעולה שמוציאים דבש מהכוורת כמו שלפלות זו פעולה שמוציאים כינים מהשיער."},
      {id:"q9",type:"multiple-choice",points:5,question:"קיטון : חדר",options:["פִּשְׁפָּשׁ : שער","סמטה : שדרה","סורג : חלון","טיפה : נוזל"],correctAnswer:0,explanation:"קיטון זה חדר קטן כמו שפשפש זה שער קטן."},
      {id:"q10",type:"multiple-choice",points:10,question:"ענק : צוואר",options:["גדול : שרוול","מכסה : קערה","כובע : ראש","טבעת : יהלום"],correctAnswer:2,explanation:"ענק זו שרשרת שעונדים על הצוואר. ענק עונדים על הצוואר כפי שכובע חובשים על הראש."},
      {id:"q11",type:"multiple-choice",points:5,question:"אצטבה : על גבי",options:["מפתן : בחוץ","דלת : בעד","קופסה : בתוך","גדר : סביב"],correctAnswer:2,explanation:"אצטבה זהו מדף. מניחים פריטים על גבי מדף כמו שמניחים פריטים בתוך קופסה."},
      {id:"q12",type:"multiple-choice",points:5,question:"אשכר : דורון",options:["חולה : וירוס","תוגה : עצב","שיכר : אלכוהול","אופניים : קטנוע"],correctAnswer:1,explanation:"אשכר ודורון אלו מילים נרדפות כמו שעצב ותוגה אלו מילים נרדפות."},
      {id:"q13",type:"multiple-choice",points:10,question:"אדריכל : התגורר",options:["משורר : כתב","תסריטאי : צפה","דוור : שלח","שופט : גזר"],correctAnswer:1,explanation:"אדריכל מתגורר בבית שהוא בנה כמו שתסריטאי צופה בסרט שהכין."},
      {id:"q14",type:"multiple-choice",points:10,question:"תתרן : חוש ריח",options:["רקדן : חוש קצב","חירש : שומע","גידם : רגל","אמיץ : מורא"],correctAnswer:3,explanation:"תתרן הוא מישהו ללא חוש ריח כמו שאמיץ הוא מישהו ללא מורא (פחד)."},
      {id:"q15",type:"multiple-choice",points:10,question:"טְוִיָּה : אריגה",options:["בישול : תיבול","התמקחות : רכישה","טעינה : פריקה","סיתות : בנייה"],correctAnswer:3,explanation:"טוויה היא מילה נרדפת לאריגה כמו שסיתות היא מילה נרדפת לבנייה."}
    ]
});

module.exports = exams;
