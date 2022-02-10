function getNewSpace(width, height) {
    return emptySpace(width, height);
}

function emptySpace(width, height) {
    let space = [];
    for(let x = 0; x < width; x++){
        let temp = [];
        for(let y = 0; y < height; y++){
          temp.push(0);
        }
        space.push(temp);
    }
    return space;
}

function randomSpace(width, height) {
    let space = [];
    for(let x = 0; x < width; x++){
        let temp = [];
        for(let y = 0; y < height; y++){
          temp.push(parseInt(Math.round(Math.random())));
        }
        space.push(temp);
    }
    return space;
}