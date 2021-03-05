// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)]
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}
const survivors = [];
let idCounter =1;

function pAequorFactory(specimenNum, dna) {
  return {
  specimenNum: specimenNum,
  dna: dna,
  mutate() {
    let newDna = this.dna;
    console.log(this.dna)
    let aBase = ['T', 'C', 'G'];
    let tBase = ['A', 'C', 'G'];
    let cBase = ['A', 'T', 'G'];
    let gBase = ['T', 'C', 'A'];
    switch (newDna[0]) {
      case 'A':
        newDna.shift();
        newDna.unshift(aBase[Math.floor(Math.random()*3)]);
        return newDna;
        break;
      case 'T':
        newDna.shift();
        newDna.unshift(tBase[Math.floor(Math.random()*3)]);
        return newDna;
        break;
      case 'C':
        newDna.shift();
        newDna.unshift(cBase[Math.floor(Math.random()*3)]);
        return newDna;
        break;
      case 'G':
        newDna.shift();
        newDna.unshift(gBase[Math.floor(Math.random()*3)]);
        return newDna;
        break;
      default:
        return 'Out Of Range'
    }
  },
  compareDNA(comparisonOrg){
    let sameStrictDnaBasePosition = 0;
      for(i=0;i<this.dna.length;i++){
        let baseElement = this.dna[i];
        let baseIndex = this.dna.indexOf(baseElement,i);
        //console.log(this.dna)
        //console.log(pAequor)
        //console.log(baseElement + ' original')
        //console.log(baseIndex + ' base Index')
        for(n=0;n<comparisonOrg.length;n++){
          let testElement = comparisonOrg[n];
          let testIndex = comparisonOrg.indexOf(testElement, n);
          //console.log(testElement+' input')
          //console.log(testIndex + ' test index')
          if((baseElement === testElement) && (baseIndex === testIndex)){
            sameStrictDnaBasePosition += 1;
            //console.log(sameStrictDnaBasePosition + ' Base similaritie(s)')
          }
        }
      }
      const percentageOfSameBases = ((sameStrictDnaBasePosition/15)*100).toFixed(2);
      return `Specimen ${this.specimenNum} and the test Specimen have ${percentageOfSameBases}% DNA in common.`
  },
  willLikelySurvive(){
    let dnaBaseMatches = 0;
    for(i=0;i<this.dna.length;i++){
       let dnaBase = this.dna[i];
       //console.log(dnaBase)
       if(dnaBase === 'C' || dnaBase === 'G'){
         dnaBaseMatches += 1;
       }
    }
    const percentageOfBaseType = ((dnaBaseMatches/15)*100).toFixed(2);
    //console.log(percentageOfBaseType)
    if(percentageOfBaseType >= 60){
      console.log(`Specimen Number: ${this.specimenNum} has a ${percentageOfBaseType} chance of survival.
      Logged to Survivors`);
      return true;
    } else {
      console.log(`Specimen Number: ${this.specimenNum} has a ${percentageOfBaseType} chance of failure.
      Specimen destroyed.`)
      return false
    }
  }
 }
};

//console.log(pAequorFactory(1, mockUpStrand()).mutate())
//console.log(pAequorFactory(1,mockUpStrand()).compareDNA(mockUpStrand()))
//console.log(pAequorFactory(1,mockUpStrand()).willLikelySurvive())

while (survivors.length < 30) {
  let newOrganism = new pAequorFactory(idCounter, mockUpStrand());
  if(newOrganism.willLikelySurvive()){
    survivors.push(newOrganism);
  }
  idCounter++;
};

console.log(survivors)
