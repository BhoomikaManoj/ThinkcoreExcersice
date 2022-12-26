dragImage = (dragEvent) => {
    dragEvent.dataTransfer.setData("Id", dragEvent.target.id + "|" + dragEvent.target.parentNode.id);
}

dropImage = (dropEvent) => {
    var dropData = dropEvent.dataTransfer.getData("Id"); // it give the box value where image1 is there
    dropItems = dropData.split("|");
    var prevElem = document.getElementById(dropItems[1]); // particular drop image
    prevElem.getElementsByTagName("div")[0].id = dropEvent.target.id;
    dropEvent.target.id = dropItems[0];   // image name
    dropEvent.preventDefault();   
} 