import MiniSearch from "minisearch";

const kev = await (await fetch("https://rud.is/data/kev.json")).json()
export const vulns = kev.vulnerabilities.map(d => {
  d.id = d.cveID
  return(d)
})

export const kevByCVE = vulns.reduce((byCVE, entry) => {
  byCVE[ entry.id ] = entry
  return byCVE
}, {})

export const kevSearch = new MiniSearch({
  fields: [ 'cveID', 'product', 'shortDescription', 'vendorProject', 'vulnerabilityName' ],
  storeFields: [ 'cveID', 'shortDescription', 'dateAdded' ]
})

kevSearch.addAll(vulns)
