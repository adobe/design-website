let placeholderContent = (placeholderType) => {
    let objectThing = {
        simOpps: [
            {title: "Tester I", product: "Acrobat", posType: "Perminant", department: "Testing", city: "Seattle",},
            {title: "Tester II", product: "Acrobat", posType: "Perminant", department: "Testing", city: "Seattle",},
            {title: "Tester III", product: "Acrobat", posType: "Perminant", department: "Testing", city: "Seattle",},
            {title: "Sr Tester", product: "Acrobat", posType: "Perminant", department: "Testing", city: "San Fransisco",},
            {title: "Jr Tester", product: "Acrobat", posType: "Perminant", department: "Testing", city: "San Fransisco",},
            {title: "Mid Tester", product: "Acrobat", posType: "Perminant", department: "Testing", city: "San Fransisco",},
            {title: "Senior Experience Designer", product: "Acrobat", posType: "Perminant", department: "Experience Design", city: "San Fransisco",},
            {title: "UI/UX Lead", product: "Acrobat", posType: "Perminant", department: "Testing", city: "San Fransisco",},
            {title: "Scrum Master", product: "Acrobat", posType: "Perminant", department: "Testing", city: "San Fransisco",},
            {title: "Sr Test Designer", product: "Adobe Poduct", posType: "Perminant", department: "Design", city: "Lehi",},
            {title: "Jr Test Specialist", product: "Acrobat", posType: "Perminant", department: "Testing", city: "Lehi",},
            {title: "Manager of Testing", product: "Adobe Poduct", posType: "Transcendental", department: "Testing", city: "New York",},
        ],
        simArticles:[
            {title: "Adobe achieves global gender pay parity", tag: "AdobeLife", tagURL: "_blank", publicationDate: "July 13, 2020", articleLink: "", color: "red" },
            {title: "What in interview panel could tell you about the job", tag: "AdobeLife", tagURL: "_blank", publicationDate: "July 13, 2020", articleLink: "", color: "white" }
        ]
    };
    return objectThing[placeholderType];
};

export default placeholderContent;