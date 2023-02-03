let toolBox = {};
    toolBox.func = {};

toolBox.func.addOption = function(target,option){
    if (target == null)
    return false;

    let defID = "",
        defName = "",
        nameList = [],
        valueList = [],
        value = '';
    
    if (option != null) {
        if (option.id != null)
            defID = option.id;
        if (option.name != null)
            defName = option.name;
        if (option.nameList != null)
            nameList = option.nameList;
        if (option.valueList != null)
            valueList = option.valueList;
        // if (option.value != null)
        //     defvalue = option.value;
    }

    let newElement = $(document.createElement("select"));
    $(newElement).attr('id', defID);
    $(newElement).attr('name', defName);
    // $(newElement).attr('value', defvalue);
    newElement.appendTo(target);

    for (let i = 0; i < nameList.length; i++) {
        if (i === 0 && value == '')
            $(newElement).append(new Option(nameList[i], valueList[i], "true", "true"));
        else if (value == valueList[i])
            $(newElement).append(new Option(nameList[i], valueList[i], "true", "true"));
        else
            $(newElement).append(new Option(nameList[i], valueList[i]));
    }
    $(newElement).data('valueList', valueList);
    $(newElement).data('nameList', nameList);

    newElement.appendTo(target);

    return newElement;
}


toolBox.func.addDiv = function(target, option){
    let defID = "", defClass = "";
    if (target == null)
        return false;
    if (option != null) {
        if (option.id != null)
            defID = option.id;
        if (option.class != null)
            defClass = option.class;
    }

    let newElement = $(document.createElement('div'));
    $(newElement).attr('id', defID);
    $(newElement).attr('class', defClass);
    newElement.appendTo(target);
    return newElement;
}

toolBox.func.addButton = function(target, option){
    if (target == null)
    return false;

    var defID = "",
        defClass = "",
        defName = "",
        defLabel = "";

    if (option != null) {
        if (option.id != null)
            defID = option.id;
        if (option.class != null)
            defClass = option.class;
        if (option.name != null)
            defName = option.name;
        if (option.label != null)
            defLabel = option.label;
    }

    var newElement = $(document.createElement('button'));
    $(newElement).attr('id', defID);
    $(newElement).attr('class', defClass);
    $(newElement).attr('name', defName);
    $(newElement).text(defLabel);

    newElement.appendTo(target);
    return newElement; 
}

toolBox.func.addInput = function(target, option){
    if (target == null)
    return false;

    var defID = "",
        defClass = "",
        defName = "",
        defType = "",
        defValue ="",
        defPlaceholder ="";

    if (option != null) {
        if (option.id != null)
            defID = option.id;
        if (option.class != null)
            defClass = option.class;
        if (option.name != null)
            defName = option.name;
        if (option.type != null)
            defType = option.type;
        if (option.value != null)
            defValue = option.value;
        if (option.type != null)
            defPlaceholder = option.placeholder;
    }

    var newElement = $(document.createElement('input'));
    $(newElement).attr('id', defID);
    $(newElement).attr('class', defClass);
    $(newElement).attr('name', defName);
    $(newElement).attr('type', defType);
    $(newElement).attr('value', defValue);
    $(newElement).attr('placeholder', defPlaceholder);

    // if (option.disabled == true) {
    //     $(newElement).prop('disabled', true);
    //     $(newElement).css('background-color', 'lightgray');
    //     $(newElement).css('opacity', 0.5);
    //     $(newElement).css('cursor', "not-allowed");
    // }
    newElement.appendTo(target);
    return newElement;
}