const allPlayers = () => {
    document.getElementById('player-container').innerHTML = '';
    document.getElementById('spinner').style.display = "block";
    const searchValue = document.getElementById('search-box').value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.player == null);
            if (data.player == null) {
                document.getElementById('spinner').style.display = "block";
            }
            else {
                showPlayerDetails(data.player);
                document.getElementById('spinner').style.display = "none";
            }
        });
    document.getElementById('spinner').style.display = "none";

};

const showPlayerDetails = (players) => {

    for (const player of players) {
        console.log(player);
        const parent = document.getElementById('player-container');
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card border text-center mb-2 p-4">
            <div class="pro-pic">
                <img class="w-50" src="${player.strThumb}" alt="">
            </div>
                <h2>Name: ${player.strPlayer}</h2>
                <h2>Country: ${player.strNationality}</h2>
                <h2></h2>
                <div class="all-button">
                    <button class="btn btn-danger">Delete</button>
                    <button onclick="details('${player.idPlayer}')" class="btn btn-success">Details</button>
                </div>
        </div>    
        `;
        parent.appendChild(div);
    }
};

const details = (info) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${info}
    `;
    fetch(url)
        .then(res => res.json())
        .then(data => setDetails(data.players[0]));
};

const setDetails = (info) => {
    if (info.strGender == "Male") {
        document.getElementById('male').style.display = "block";
        document.getElementById('female').style.display = "none";
    }
    else {
        document.getElementById('male').style.display = "none";
        document.getElementById('female').style.display = "block";
    }
    document.getElementById('details-container').innerHTML = `
        <div class="rounded-start border border-dark text-center">
        <img class="w-50" src="${info.strThumb}" alt="">
        <h2>Name: ${info.strPlayer}</h2>
        <h2>Team: ${info.strTeam}</h2>
        <h2>Position: ${info.strPosition}</h2>
        <h2>Description: ${info.strDescriptionEN}</h2>
        </div>  
    `;
}