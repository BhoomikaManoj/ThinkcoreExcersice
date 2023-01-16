var count = 0
addoption = (option) => {
    count += option
    html = ""
    for (let i = 0; i < count; i++) {
        html += `<div class="d-flex my-3">
            <h6 class="col-md-3">${String.fromCharCode(68 + i)}</h6><input type="text" id="input${String.fromCharCode(68 + i)}" class="col-md-6">
                <input type="radio" id="input${String.fromCharCode(68 + i)}" name="option" value="${3 + i}" class="ms-5" >
        </div>`
    }

    $("#addRadioButton").html(html)
    $("#count").html(parseInt(count) + option)
    if (count >= 4) {
        $("#button1").css("display", "none")
    } else {
        $("#button1").css("display", "inline")
    }
    if (count >= 1) {
        $("#button2").css("visibility", "visible")
    } else {
        $("#button2").css("visibility", "hidden")
    }

}

submitQuestions = () => {
    // localStorage.clear()
    var textarea = $('#question').val()
    var optionA = $("#inputA").val()
    var optionB = $("#inputB").val()
    var optionC = $("#inputC").val()
    var count = parseInt($("#count").text().trim())
    var optionlist = []
    $("#errortextarea").text("")
    $("#errorA").text("")
    $("#errorB").text("")
    $("#errorC").text("")
    var checked = $("input[type='radio']:checked").val()
    if (textarea.trim() == "") {
        $("#errortextarea").text("Mandatory to fill this filed")
        return false
    }

    if (optionA.trim() == "") {
        $("#errorA").html("Mandatory to fill this filed")
        return false
    }
    if (optionB == "") {
        $("#errorB").html("Mandatory to fill this filed")
        return false
    }
    if (optionC == "") {
        $("#errorC").html("Mandatory to fill this filed")
        return false
    }
    if (!$("input[type='radio']:checked").val()) {
        alert("Please select any one radio button")
        return false
    }
    for (let i = 65; i < 68 + count - 1; i++) {
        optionlist.push($(`#input${String.fromCharCode(i)}`).val())
    }
    if (!localStorage.getItem("mocktest")) {
        var list = []
        var object = {
            "questionid": 1,
            "question": textarea,
            "option": optionlist,
            "Answer": checked
        }
        list.push(object)
        localStorage.setItem("mocktest", JSON.stringify(list))
    } else {
        var list = JSON.parse(localStorage.getItem("mocktest"))
        var object = {
            "questionid": list.length + 1,
            "question": textarea,
            "option": optionlist,
            "Answer": checked
        }
        list.push(object)
        localStorage.setItem("mocktest", JSON.stringify(list))
        console.log(list)
    }
    location.reload()
}

starttest = (qid, userid) => {
    // localStorage.clear()
    var html = ""
    var QuestionList = JSON.parse(localStorage.getItem("mocktest"))
    // console.log(QuestionList)
    var UserAnswersList = JSON.parse(localStorage.getItem("resultdata"))
    // console.log(UserAnswersList)

    if (!$("input[type='radio']:checked").val() && qid != 0) {
        $("#error").text("Please answer the question")
        return false
    }

    html += `<div class="d-flex">
        <h2> Question No </h2>
        <h2 style="margin-left:5px" id="duplicate">${QuestionList[qid].questionid}</h2>
        </div>
            <p style="margin: 40px 60px;font-size: larger;">
                ${QuestionList[qid].question}
            </p>`

            // display options
    for (let i = 0; i < QuestionList[qid].option.length; i++) {
        html += `<div class="d-flex col-md-6">
                        <input type="radio" name="answer" value="${i}" `
        if (localStorage.getItem("resultdata")) {
            html += checked(UserAnswersList, QuestionList, userid, qid, i)
        }
        html += `>
            <p style="font-size: larger;margin-left: 20px;margin-top: 10px;" >${QuestionList[qid].option[i]}</p>
            </div>`
    }
    html += `<span class="text-danger" id="error"></span>`
    html += `<div>`
    if (qid != 0) {
        html += `<button style="margin-top: 40px;padding: 5px 50px;border: 0px;border-radius: 5px;" onclick="starttest(${qid}-1,${userid})" class="bg-primary text-white">
                Pervious
            </button>`
    }
    if (qid != QuestionList.length - 1) {
        html += `<button style="margin-top: 40px;float:right;margin-right: 50px;padding: 5px 50px;border: 0px;border-radius: 5px;" class="bg-primary text-white" onclick="starttest(${qid}+1,${userid})" >
                Next
            </button>`
    }
    if (qid == QuestionList.length - 1) {
        html += `<button style="margin-top: 40px;float:right;margin-right: 50px;padding: 5px 50px;border: 0px;border-radius: 5px;" class="bg-primary text-white" onclick="submit(${qid}+1,${userid})" >
                submit
            </button>`
    }

    html + `</div>`
    if (qid != 0) {
        console.log($("input[type='radio']:checked").val())
        var list2 = store(userid)
    }
    $("#testbody").html(html)

}

start = () => {
    var userid = $("#userid").val()
    if (!userid) {
        alert("Please enter the filed")
        $("#userid").focus()
        return false
    }
    starttest(0, userid)
}

submit = (qid, userid) => {
    store(userid)
    var DisplayAnswer = ""
    var QuestionList = JSON.parse(localStorage.getItem("mocktest"))
    var UserAnswersList = JSON.parse(localStorage.getItem("resultdata"))
    var Totalmarks = 0
    for (let i = 0; i < QuestionList.length; i++) {
        DisplayAnswer += `<div>
        <p style="font-size: 30px;">${QuestionList[i].questionid}. ${QuestionList[i].question}</div>
        <p style="font-size: 25px;margin-left: 25px;">Correct Answer : ${QuestionList[i].option[QuestionList[i].Answer]}</p>`
        for (let j = 0; j < UserAnswersList.length; j++) {
            if (UserAnswersList[j].questionid == QuestionList[i].questionid && UserAnswersList[j].userid == userid) {
                if (UserAnswersList[j].markedanswer == QuestionList[i].Answer) {
                    markedanswer = QuestionList[i].option[UserAnswersList[j].markedanswer]
                    DisplayAnswer += `<p style="font-size: 25px;margin-left: 25px;background-color: darkgreen; color:white">Marked Answer : ${QuestionList[i].option[UserAnswersList[j].markedanswer]}<p style="float:right;font-size:15px">+1</p></p></div>`
                    Totalmarks += 1
                } else {
                    DisplayAnswer += `<p style="font-size: 25px;margin-left: 25px;background-color: darkred; color:white">Marked Answer : ${QuestionList[i].option[UserAnswersList[j].markedanswer]}</p></div>`
                }
            }
        }
    }
    DisplayAnswer += `<h3 class="mt-5">Total Marks : ${Totalmarks} </h3>`
    $("#testbody").html(DisplayAnswer)
}

store = (userid) => {
    var duplicate = $("#duplicate").text()
    if (!localStorage.getItem("resultdata")) {
        var list2 = []
        var object2 = {
            "questionid": 1,
            "userid": userid,
            "markedanswer": $("input[type='radio']:checked").val()
        }
        list2.push(object2)
        localStorage.setItem("resultdata", JSON.stringify(list2))
    } else {
        var list2 = JSON.parse(localStorage.getItem("resultdata"))
        var found = false
        for (let j = 0; j < list2.length; j++) {
            if (list2[j].questionid == duplicate && list2[j].userid == userid) {
                list2[j].markedanswer = $("input[type='radio']:checked").val()
                found = true
            }
        }
        if (!found) {
            var object2 = {
                "questionid": duplicate,
                "userid": userid,
                "markedanswer": $("input[type='radio']:checked").val()
            }
            list2.push(object2)
        }
        localStorage.setItem("resultdata", JSON.stringify(list2))
    }
    return list2
}

checked = (UserAnswersList, QuestionList, userid, qid, i) => {
    if (localStorage.getItem("resultdata")) {
        for (j = 0; j < UserAnswersList.length; j++) {
            if (UserAnswersList[j].userid == userid && UserAnswersList[j].questionid == QuestionList[qid].questionid) {
                if (i == UserAnswersList[j].markedanswer) {
                    return `checked`
                }
            }
        }
    }
}