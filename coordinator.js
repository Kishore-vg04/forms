function update(event) {
    var card = event.target.closest(".card1");

    if (card) {
        var remark = card.querySelector(".remark");
        var input = card.querySelector(".inputs");
        var button = card.querySelector(".submit-disapproval");
        var approve = card.querySelector(".approve");
        
        remark.style.display = "inline";
        input.style.display = "inline";
        button.style.display = "inline";
        approve.style.display = "none";
    }
}
