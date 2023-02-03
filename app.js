let memberManager = {};
    memberManager.func = {};
    memberManager.id = {};
    memberManager.constants = {};
    dataBaseMap = new Map();
    mode = "list";
    // console.log(memberManager)

memberManager.func.init = function () {
    memberManager.func.createTabs();
    $("#dateMon").datepicker({ dateFormat: 'yy-mm-dd' });

    this.id = memberManager.id;
    this.con = memberManager.constants;

    memberManager.func.defultOption(); 
    memberManager.func.drawCalendar();
};


memberManager.func.createTabs =function() {
    let target =$("#tab");
    let butttonList =toolBox.func.addButton(target,{id:"buttonList",class:"tablinks"});
    let buttonListImg =document.createElement("img");
    $(buttonListImg).attr("src","./icon/icons8-list.png");
    $(buttonListImg).appendTo(butttonList);

    document.getElementById(mode).style.display = "none";
    $(butttonList).on("click",function () {
        memberManager.func.exchangeDivButton(buttonListImg);
    });
};


memberManager.func.exchangeDivButton = function (buttonListImg) {
    document.getElementById(mode).style.display = "block";
    if(mode == "list"){
        mode = "calendar";
        document.getElementById(mode).style.display = "none";
        $(buttonListImg).attr("src","./icon/icons8-calendar.png");
    }else{
        mode = "list";
        document.getElementById(mode).style.display = "none";
        $(buttonListImg).attr("src","./icon/icons8-list.png");
        memberManager.func.drawCalendar();
    }     
};


memberManager.func.defultOption = function () {
    let target = $("#partOne");
    let exerciseType = toolBox.func.addOption(target, {
        id: this.id.exerciseType,
        name: this.id.exerciseType,
        nameList: this.con.typeList,
        valueList: this.con.typeList
    });


    let exerciseWays = toolBox.func.addOption(target, {
        id: this.id.exerciseWays,
        name: this.id.exerciseType,
        nameList: this.con.waysList[0],
        valueList: this.con.waysList[0]
    });

    
    $(exerciseType).on("change", function () {
        $("#exerciseWays option").remove();
        let valueTpyeOption = $("#exerciseType option:selected").val();
        for (let i = 0; i < memberManager.constants.typeList.length; i++) {
            if (valueTpyeOption == memberManager.constants.typeList[i])
                for (let j = 0; j < memberManager.constants.waysList[i].length; j++) {
                    $("#exerciseWays").append(new Option(
                        memberManager.constants.waysList[i][j],
                        memberManager.constants.waysList[i][j]));
                };
        };
    });

    $("#submit").on("click", function (e) {
        e.preventDefault();
        let valueDateMon = $("#funcBar").find('input[name="dateMon"]').val();
        let valueType = $("#exerciseType option:selected").val();
        let valueWay = $("#exerciseWays option:selected").val();
        let valueWeight = $("#funcBar").find('input[name="weight"]').val();
        let valueReps = $("#funcBar").find('input[name="reps"]').val();
        let valueSets = $("#funcBar").find('input[name="sets"]').val();
        let valueRest = $("#funcBar").find('input[name="rest"]').val();

        $("#funcBar").each(function () {
            this.reset();
        });


        if(valueDateMon == "")
            return alert("請輸入日期");
        if(valueType == "請選擇部位")
            return alert("請輸入部位");
        if(valueWay == "請選擇方式")
            return alert("請輸入方式");
        if(valueWeight == "")
            return alert("請輸入重量");
        if(valueReps == "")
            return alert("請輸入次數");
        if(valueSets == "")
            return alert("請輸入組數");
        if(valueRest == "")
            return alert("請輸入休息時間");

      
        let savedata = {
            "dateMon": valueDateMon,
            "type": valueType,
            "way": valueWay,
            "weight": valueWeight,
            "reps": valueReps,
            "sets": valueSets,
            "rest": valueRest
        };
        memberManager.func.upDateDataBaseMap(savedata, valueDateMon);
        memberManager.func.drawLession();
        memberManager.func.drawCalendar();
    });
};


memberManager.func.upDateDataBaseMap = function (savedata, valueDateMon) {
    if (dataBaseMap.has(valueDateMon)) {
        dataBaseMap.get(valueDateMon).push(savedata);
    } else {
        let dataBaseArray = new Array();
        dataBaseArray.push(savedata);
        dataBaseMap.set(valueDateMon, dataBaseArray);
    }
    dataBaseMap = new Map([...dataBaseMap.entries()].sort());
};


memberManager.func.drawLession = function () {
    // $("#list").empty();
    $(".listFrame").each(function () {
        this.remove();
    });

    for (const key of dataBaseMap.keys()) {
        let listFrame = toolBox.func.addDiv($("#list"), { id:key, class: "listFrame" });
        let listDate = toolBox.func.addDiv($(listFrame), { class: "date" });
        $(listDate).text(key);

        let value =dataBaseMap.get(key);
        for (let i = 0; i < value.length; i++) {
            let itemID = key+"-"+i;
            let arrIndex =i;
            let listItem = toolBox.func.addDiv($(listFrame), { id:itemID, class: "item" });
            let listTypeWayDiv =toolBox.func.addDiv($(listItem),{class:"listTypeWayDiv"});
            let listType = toolBox.func.addDiv($(listTypeWayDiv), { class: "type" });
            $(listType).text(value[i].type);
            let listWay = toolBox.func.addDiv($(listTypeWayDiv), { class: "way" });
            let listNumDiv =toolBox.func.addDiv($(listItem),{class:"listNumDiv"})
            let listWeight = toolBox.func.addDiv($(listNumDiv), { class: "weight" });
            let listRep = toolBox.func.addDiv($(listNumDiv), { class: "rep" });
            let listSet = toolBox.func.addDiv($(listNumDiv), { class: "set" });
            let listRest = toolBox.func.addDiv($(listNumDiv), { class: "rest" });
            $(listWay).text(value[i].way);
            $(listWeight).text(value[i].weight + "公斤");
            $(listRep).text(value[i].reps + "(次/秒)");
            $(listSet).text(value[i].sets + "組");
            $(listRest).text("休息時間" + value[i].rest + "秒");

            let listBtnEdit = toolBox.func.addButton($(listNumDiv), { class: "edit" })
            $(listBtnEdit).text("編輯");
            $(listBtnEdit).on("click",function(){
                memberManager.func.drawEditLessionFrame(key,arrIndex);
            });
            let listBtnDel = toolBox.func.addButton($(listNumDiv), { class: "delet" })
            $(listBtnDel).text("刪除");
            $(listBtnDel).on("click",function(){
                memberManager.func.deletLession(key,itemID,arrIndex);
            });
        };
    };    
};


memberManager.func.deletLession = function (key,itemID,arrIndex) {
    if (dataBaseMap.get(key).length > 1) {
        document.getElementById(itemID).remove();
        dataBaseMap.get(key).splice(arrIndex,1);
    }else {
        document.getElementById(key).remove();
        dataBaseMap.delete(key);
    }
};


memberManager.func.drawEditLessionFrame = function (key,arrIndex) {
// *******************DRAW FRAME*********************    
    let black = toolBox.func.addDiv($("body"), { id: "black" });
    let editFrame = toolBox.func.addDiv($(black), { id: "editFrame" });
    let editFrameTitle = toolBox.func.addDiv($(editFrame), { id: "editFrameTitle" });
    $(editFrameTitle).text("會員課表更新");


    let editTypeDiv = toolBox.func.addDiv($(editFrame),{id:"editTypeDiv",class:"div"});
    let editFrameTypeLable =toolBox.func.addDiv($(editTypeDiv),{class:"lable"});
    $(editFrameTypeLable).text("訓練部位 :");
    let editFrameTypeCon = toolBox.func.addOption($(editTypeDiv), {
        id: memberManager.id.editFrameType,
        name: memberManager.id.editFrameType,
        nameList: memberManager.constants.typeList,
        valueList: memberManager.constants.typeList
    });
    let typeListIndex = memberManager.constants.typeList.indexOf(dataBaseMap.get(key)[arrIndex].type);
    $("#editFrameType option")[typeListIndex].selected = true;	


    let editWayDiv =toolBox.func.addDiv($(editFrame),{id:"editWayDiv",class:"div"});
    let editFrameWayLable =toolBox.func.addDiv($(editWayDiv),{class:"lable"});
    $(editFrameWayLable).text("訓練方式 :");
    let editFrameWaysCon = toolBox.func.addOption($(editWayDiv), {
        id: memberManager.id.editFrameWays,
        name: memberManager.id.editFrameWays,
    });
    let wayListIndex = memberManager.constants.waysList[typeListIndex].indexOf(dataBaseMap.get(key)[arrIndex].way);
    for (let j = 0; j < memberManager.constants.waysList[typeListIndex].length; j++) {
        $("#editFrameWays").append(new Option(
            memberManager.constants.waysList[typeListIndex][j],
            memberManager.constants.waysList[typeListIndex][j]
        ));
    };
    $("#editFrameWays option")[wayListIndex].selected = true;	



    $(editFrameTypeCon).on("change", function () {
        $("#editFrameWays option").remove();
        let editValueTpye = $("#editFrameType option:selected").val();
        for (let i = 0; i < memberManager.constants.typeList.length; i++) {
            if (editValueTpye == memberManager.constants.typeList[i])
                for (let j = 0; j < memberManager.constants.waysList[i].length; j++) {
                    $("#editFrameWays").append(new Option(
                        memberManager.constants.waysList[i][j],
                        memberManager.constants.waysList[i][j]
                    ));
                };
        };
    });

    let editWeightDiv =toolBox.func.addDiv($(editFrame),{id:"editWeightDiv",class:"div"});
    let editWayLable =toolBox.func.addDiv($(editWeightDiv),{class:"lable"});
    $(editWayLable).text("重量(公斤) :")
    let editWeight = toolBox.func.addInput($(editWeightDiv), {
        id: "editWeight",
        name: "editWeight",
        type: "number",
        value: dataBaseMap.get(key)[arrIndex].weight,
    });
    let editRepsDiv =toolBox.func.addDiv($(editFrame),{id:"editRepsDiv",class:"div"});
    let editRepsLable =toolBox.func.addDiv($( editRepsDiv),{class:"lable"});
    $(editRepsLable).text("重複次數/秒數 :");
    let editReps = toolBox.func.addInput($( editRepsDiv), {
        id: "editReps",
        name: "editReps",
        type: "number",
        value: dataBaseMap.get(key)[arrIndex].reps,
    });
    let editSetsDiv =toolBox.func.addDiv($(editFrame),{id:"editSetsDiv",class:"div"});
    let editSetsLable =toolBox.func.addDiv($(editSetsDiv),{class:"lable"});
    $(editSetsLable).text("組數 :");
    let editSets = toolBox.func.addInput($(editSetsDiv), {
        id: "editSets",
        name: "editSets",
        type: "number",
        value: dataBaseMap.get(key)[arrIndex].sets,
    });
    let editRestDiv =toolBox.func.addDiv($(editFrame),{id:"editRestDiv",class:"div"});
    let editRestLable =toolBox.func.addDiv($(editRestDiv),{class:"lable"});
    $(editRestLable).text("休息時間(秒數) :");
    let editRest = toolBox.func.addInput($(editRestDiv), {
        id: "editRest",
        name: "editRest",
        type: "number",
        value: dataBaseMap.get(key)[arrIndex].rest,
    });

    let editListBtnDiv =toolBox.func.addDiv($(editFrame),{id:"editListBtnDiv"})
    let editListBtnConfirm = toolBox.func.addButton($(editListBtnDiv), { class:"editBtn",id:"editListBtnConfirm"})
    $(editListBtnConfirm).text(" 確 認");
    let editListBtnCancel = toolBox.func.addButton($(editListBtnDiv), { class:"editBtn",id:" editListBtnCancel"})
    $(editListBtnCancel).text(" 取 消");


 // *******************UPDATA TO MAP**********************    
    $("#editListBtnConfirm").on("click",function(){
        let valueType = $("#editFrameType option:selected").val();
        let valueWay = $("#editFrameWays option:selected").val();
        let valueWeight = $("#editWeightDiv").find('input[name="editWeight"]').val();
        let valueReps = $("#editRepsDiv").find('input[name="editReps"]').val();
        let valueSets = $("#editSetsDiv").find('input[name="editSets"]').val();
        let valueRest = $("#editRestDiv").find('input[name="editRest"]').val();
    
        let savedata = {
            "type": valueType,
            "way": valueWay,
            "weight": valueWeight,
            "reps": valueReps,
            "sets": valueSets,
            "rest": valueRest
        };
    
        if(dataBaseMap.get(key)== 1){
            dataBaseMap.delete(key);
            memberManager.func.upDateDataBaseMap(savedata, key);
        }else{
            dataBaseMap.get(key).splice(arrIndex,1);
            memberManager.func.upDateDataBaseMap(savedata, key);
        }
        memberManager.func.drawLession();
    });

    $(".editBtn").on("click",function(){
        $("#black").remove();
    });
};



memberManager.func.drawCalendar = function(){
    let data =[];
    for(const key of dataBaseMap.keys()){
       let dataBaseArray= dataBaseMap.get(key);
       for(let i=0; i<dataBaseArray.length; i++){
            data.push({
                    id:key,
                    title:dataBaseArray[i].type,
                    start:key
            });   
       }; 
    };
  
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        timeZone: 'local',
        initialView: 'dayGridMonth',
        locale: 'zh-tw',
        navLinks: true,

        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        windowResize: function(){},
        eventClick: function(info) {
            memberManager.func.showCalendarInfo(info);
        }, 
        events:data,

        editable: true,
        eventDrop: function(info) {
            memberManager.func.dropEventUpdata(info);
            if (!confirm("Are you sure about this change?")) {
                info.revert();
            };
        }
    });
        calendar.render(); 
};


memberManager.func.showCalendarInfo =function (info){
    let key = info.event.startStr;
    let title = info.event.title;

    let blackCal = toolBox.func.addDiv($("body"), { class: "black" });
    let showInfoFrame =toolBox.func.addDiv($(blackCal),{id:"showInfoFrame"});
    let showInfoTitle =toolBox.func.addDiv($(showInfoFrame),{id:"showInfoTitle"});
    showInfoTitle.text("詳細資訊");
    let showInfoDivs =toolBox.func.addDiv($(showInfoFrame),{id:"showInfoDivs"});

    
    let showInfoDate =toolBox.func.addDiv($(showInfoDivs),{class:"showInfoDate"});
    $(showInfoDate).text(key);
    let showInfoTypeDiv =toolBox.func.addDiv($(showInfoDivs),{class:"showInfoDiv"});
    let showInfoTypeDivLab =toolBox.func.addDiv($(showInfoTypeDiv),{class:"showInfoTypeDivLab"});
    showInfoTypeDivLab.text("訓練部位 :");
    let showInfoTypeDivCon =toolBox.func.addDiv($(showInfoTypeDiv),{class:"showInfoTypeDivCon"});
    showInfoTypeDivCon.text(title);


    let dataBaseArray = dataBaseMap.get(key);
    for(let i=0; i<dataBaseArray.length; i++){
        if(dataBaseArray[i].type == title){
            let showInfoWayDiv =toolBox.func.addDiv($(showInfoDivs),{class:"showInfoDiv"});
            let showInfoWayDivLab =toolBox.func.addDiv($(showInfoWayDiv),{class:"showInfoTypeDivLab"});
            showInfoWayDivLab.text("訓練方式 :");
            let showInfoWayDivCon =toolBox.func.addDiv($(showInfoWayDiv),{class:"showInfoTypeDivCon"});
            showInfoWayDivCon.text(dataBaseArray[i].way);

            let showInfoWeightDiv =toolBox.func.addDiv($(showInfoDivs),{class:"showInfoDiv"});
            let showInfoWeightDivLab =toolBox.func.addDiv($(showInfoWeightDiv),{class:"showInfoTypeDivLab"});
            showInfoWeightDivLab.text("重量(公斤) :");
            let showInfoWeightDivCon =toolBox.func.addDiv($(showInfoWeightDiv),{class:"showInfoTypeDivCon"});
            showInfoWeightDivCon.text(dataBaseArray[i].weight);

            let showInfoRepsDiv =toolBox.func.addDiv($(showInfoDivs),{class:"showInfoDiv"});
            let showInfoRepsDivLab =toolBox.func.addDiv($(showInfoRepsDiv),{class:"showInfoTypeDivLab"});
            showInfoRepsDivLab.text("訓練次數 :");
            let showInfoRepsDivCon =toolBox.func.addDiv($(showInfoRepsDiv),{class:"showInfoTypeDivCon"});
            showInfoRepsDivCon.text(dataBaseArray[i].reps);

            let showInfoSetsDiv =toolBox.func.addDiv($(showInfoDivs),{class:"showInfoDiv"});
            let showInfoSetsDivLab =toolBox.func.addDiv($(showInfoSetsDiv),{class:"showInfoTypeDivLab"});
            showInfoSetsDivLab.text("訓練組數 :");
            let showInfoSetsDivCon =toolBox.func.addDiv($(showInfoSetsDiv),{class:"showInfoTypeDivCon"});
            showInfoSetsDivCon.text(dataBaseArray[i].sets);

            let showInfoRestDiv =toolBox.func.addDiv($(showInfoDivs),{class:"showInfoDiv"});
            let showInfoRestDivLab =toolBox.func.addDiv($(showInfoRestDiv),{class:"showInfoTypeDivLab"});
            showInfoRestDivLab.text("休息時間(秒數) :");
            let showInfoRestDivCon =toolBox.func.addDiv($(showInfoRestDiv),{class:"showInfoTypeDivCon"});
            showInfoRestDivCon.text(dataBaseArray[i].rest);
        };
    };
    let showInfoCloseBtn =toolBox.func.addButton($(showInfoFrame),{id:"showInfoCloseBtn"});
    showInfoCloseBtn.text("關 閉");
    showInfoCloseBtn.on("click",function(){
            $(".black").remove();
    });
};


memberManager.func.dropEventUpdata =function(info){
    let oldKey = info.event._def.publicId;
    let item = info.event.title;
    let newKey = info.event.startStr;
    let dataBaseArray = dataBaseMap.get(oldKey);

    if(dataBaseArray.length > 1){
        for(let i=0; i<dataBaseArray.length; i++){
            if(dataBaseArray[i].type==item){
                memberManager.func.upDateDataBaseMap(dataBaseArray[i], newKey);
                dataBaseArray.splice(i,1);
                memberManager.func.drawLession();
            }; 
        };
               
    }else{
        memberManager.func.upDateDataBaseMap(dataBaseArray[0], newKey);
        dataBaseMap.delete(oldKey);
        memberManager.func.drawLession();
    }
};


