import { LitElement, css, html, unsafeCSS } from 'lit'
import tachyonsCSS from '../node_modules/tachyons/css/tachyons.min.css?inline'
import { vulns, kevSearch, kevByCVE } from './startup'

const searchOptions = {
  fuzzy: 0.1,
  prefix: true,
  fields: [ 'cveID', 'product', 'shortDescription', 'vendorProject', 'vulnerabilityName' ],
  combineWith: 'OR',
  filter: null
}

export class KEVSearch extends LitElement {
  static get properties() {
    return {
      searchText: { type: String },
      results: { type: Array }
    }
  }

  firstUpdated() {
    this.shadowRoot.querySelector('#kev').focus();
  }

  constructor() {
    super()
    this.searchText = ""
    this.results = []
  }

  render() {
    return html`
   <div class="w100 sans-serif">
    <div class="pa4-l">
      <div class="bg-black-80 mw7 center pa3 br2-ns ba b--white-10">
        <fieldset class="cf bn ma0 pa0">
          <div>
            <input class="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-100-m w-100-l br2-ns br--left-ns" 
                   placeholder="enter search terms…" 
                   type="text" 
                   name="kev-input" 
                   .value=${this.searchText}
                   @input=${this._getSearchResults}
                   id="kev"/>
          </div>
        </fieldset>
      </div>
      <div class="pt4 lh-copy">
      ${this.results.map(r => html`
      <entry class="mw7 center pb4">
        <cve class="b f5">
          <a class="link underline blue hover-green" href="https://nvd.nist.gov/vuln/detail/${r.cveID}" target="nvd">${r.cveID}</a>
        </cve>
        <vuln>${r.vulnerabilityName}</vuln>
        <descr class="i" >${r.shortDescription}</descr>
      </entry>
      `)}
      </div>
    </div>
    </div>
    `
  }

  _getSearchResults(e) {
    e.preventDefault();
    this.inputValue = e.target.value;
    this.results = kevSearch.search(e.target.value, searchOptions).map(({ id }) => kevByCVE[ id ])
  }

  static get styles() {
    return css`
    ${unsafeCSS(tachyonsCSS)}
    entry, cve, vuln, descr {
      display: block
    }
    `
  }
}

window.customElements.define('kev-search', KEVSearch)
