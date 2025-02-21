function update(event) {
    var card = event.target.closest(".card1");

    if (card) {
        var remark = card.querySelector(".remark");
        var inputs = card.querySelector(".inputs");
        var button = card.querySelector(".submit-disapproval");
        var approve = card.querySelector(".approve");
        if(remark.style.display == "inline" && inputs.style.display == "inline"
            && button.style.display == "inline" && approve.style.display == "none"){
            remark.style.display = "none";
            inputs.style.display = "none";
            button.style.display = "none";
            approve.style.display = "inline";
            }
            else{
                remark.style.display = "inline";
                inputs.style.display = "inline";
                button.style.display = "inline";
                approve.style.display = "none";
            }
        
    }
}