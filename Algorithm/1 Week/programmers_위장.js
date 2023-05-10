function solution(clothes) {
    //1-1. 의상 종류별로 의상의 개수를 구하는 해쉬맵 선언
    const map = new Map();
    //1-2. clothes 배열을 순회하면서 hashmap에 의상 종류와 개수를 저장한다.
    for(let i = 0 ; i < clothes.length ; i++){
        const clothType = clothes[i][1] // headgear <-- 해시맵의 키값이 된다.
        /*1-3 . 해당 옷의 종류가 key로서 해시맵에 저장되 있는지 확인해, 
        1) 이미 저장되어 있다면 -> 그 value를 꺼내고 
        2) 아직 저장되지 않은 key라면 -> value로 새 배열을 선언하고, ex){headgear: ["yellow_hat", ...]} */
        const list = map.get(clothType) ?? new Array(); // {headgear: []}
        // 얻어낸 value 배열에 해당 타입의 옷을 넣어준다. 
        list.push(clothes[i][0]) // {headgear: ["yellow_hat", ...]
        //그 후 방금 업데이트 한 해당 종류의 vlaue를 다시 해쉬맵에 set 해준다.
        map.set(clothType, list)
    }

    //2. 최종 리턴할 answer 변수를 선언하고 1 할당 (해쉬맵을 돌면서  모든 경우의 수를 곱할거기 때문이다.)
    let answer = 1; 
    //각 key는 옷의 종류가 된다.
    for(let key of map.keys()) {
        //key의 value 갯수를 구하고(해당 종류의 의상 개수) + 1을 더해준(아무것도 착용하지 않을 수 있기 때문) 값을 answer에 곱한다.
       answer *= map.get(key).length + 1
    }
    //3. 우리가 얻어낸 모든 경우의 수에 어떠한 종류의 옷도 입지 않은 경우 (1가지)를 제외하기 위해 → 최종 경우의 수에 -1을 해준다.
    return answer -1 ;
}