/* eslint-disable */ 
import React from 'react'

const TestHtml = () => (
    <div>
    <p><strong>Advertisement </strong></p>
    <ul>
      <li><strong><a href="https://nodeca.github.io/pica/demo/">pica</a></strong> - high quality and fast image
        resize in browser.</li>
      <li><strong><a href="https://github.com/nodeca/babelfish/">babelfish</a></strong> - developer friendly
        i18n with plurals support and easy syntax.</li>
    </ul>
    <p>You will like those projects!</p>
    <hr />
    <h2>h2 Heading</h2>
    <h3>h3 Heading</h3>
    <h4>h4 Heading</h4>
    <h5>h5 Heading</h5>
    <h6>h6 Heading</h6>
    <h2>Horizontal Rules</h2>
    <hr />
    <hr />
    <hr />
    <h2>Typographic replacements</h2>
    <p>Enable typographer option to see result.</p>
    <p>© © ® ® ™ ™ § § ±</p>
    <p>test… test… test… test?.. test!..</p>
    <p>!!! ??? ,  – —</p>
    <p>“Smartypants, double quotes” and ‘single quotes’</p>
    <h2>Emphasis</h2>
    <p><strong>This is bold text</strong></p>
    <p><strong>This is bold text</strong></p>
    <p><em>This is italic text</em></p>
    <p><em>This is italic text</em></p>
    <p><s>Strikethrough</s></p>
    <h2>Blockquotes</h2>
    <blockquote>
      <p>Blockquotes can also be nested…</p>
      <blockquote>
        <p>…by using additional greater-than signs right next to each other…</p>
        <blockquote>
          <p>…or with spaces between arrows.</p>
        </blockquote>
      </blockquote>
    </blockquote>
    <h2>Lists</h2>
    <p>Unordered</p>
    <ul>
      <li>Create a list by starting a line with <code>+</code>, <code>-</code>, or <code>*</code></li>
      <li>Sub-lists are made by indenting 2 spaces:
        <ul>
          <li>Marker character change forces new list start:
            <ul>
              <li>Ac tristique libero volutpat at</li>
            </ul>
            <ul>
              <li>Facilisis in pretium nisl aliquet</li>
            </ul>
            <ul>
              <li>Nulla volutpat aliquam velit</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>Very easy!</li>
    </ul>
    <p>Ordered</p>
    <ol>
      <li>
        <p>Lorem ipsum dolor sit amet</p>
      </li>
      <li>
        <p>Consectetur adipiscing elit</p>
      </li>
      <li>
        <p>Integer molestie lorem at massa</p>
      </li>
      <li>
        <p>You can use sequential numbers…</p>
      </li>
      <li>
        <p>…or keep all the numbers as <code>1.</code></p>
      </li>
    </ol>
    <p>Start numbering with offset:</p>
    <ol start={57}>
      <li>foo</li>
      <li>bar</li>
    </ol>
    <h2>Code</h2>
    <p>Inline <code>code</code></p>
    <p>Indented code</p>
    <pre><code>// Some comments{"\n"}line 1 of code{"\n"}line 2 of code{"\n"}line 3 of code{"\n"}</code></pre>
    <p>Block code “fences”</p>
    <pre className="hljs"><code>Sample text here...{"\n"}</code></pre>
    <p>Syntax highlighting</p>
    <pre className="hljs language-js"><code><span className="hljs-keyword">var</span> foo = <span className="hljs-function"><span className="hljs-keyword">function</span> (<span className="hljs-params">bar</span>) </span>{"{"}{"\n"}{"  "}<span className="hljs-keyword">return</span> bar++;{"\n"}{"}"};{"\n"}{"\n"}<span className="hljs-built_in">console</span>.log(foo(<span className="hljs-number">5</span>));{"\n"}</code></pre>
    <h2>Tables</h2>
    <table>
      <thead>
        <tr>
          <th>Option</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>data</td>
          <td>path to data files to supply the data that will be passed into templates.</td>
        </tr>
        <tr>
          <td>engine</td>
          <td>engine to be used for processing templates. Handlebars is the default.</td>
        </tr>
        <tr>
          <td>ext</td>
          <td>extension to be used for dest files.</td>
        </tr>
      </tbody>
    </table>
    <p>Right aligned columns</p>
    <table>
      <thead>
        <tr>
          <th style={{textAlign: 'right'}}>Option</th>
          <th style={{textAlign: 'right'}}>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{textAlign: 'right'}}>data</td>
          <td style={{textAlign: 'right'}}>path to data files to supply the data that will be passed into templates.</td>
        </tr>
        <tr>
          <td style={{textAlign: 'right'}}>engine</td>
          <td style={{textAlign: 'right'}}>engine to be used for processing templates. Handlebars is the default.</td>
        </tr>
        <tr>
          <td style={{textAlign: 'right'}}>ext</td>
          <td style={{textAlign: 'right'}}>extension to be used for dest files.</td>
        </tr>
      </tbody>
    </table>
    <h2>Links</h2>
    <p><a href="http://dev.nodeca.com">link text</a></p>
    <p><a href="http://nodeca.github.io/pica/demo/" title="title text!">link with title</a></p>
    <p>Autoconverted link <a href="https://github.com/nodeca/pica">https://github.com/nodeca/pica</a> (enable linkify to see)</p>
    <h2>Images</h2>
    <p><img src="https://octodex.github.com/images/minion.png" alt="Minion" />
      <img src="https://octodex.github.com/images/stormtroopocat.jpg" alt="Stormtroopocat" title="The Stormtroopocat" /></p>
    <p>Like links, Images also have a footnote style syntax</p>
    <p><img src="https://octodex.github.com/images/dojocat.jpg" alt="Alt text" title="The Dojocat" /></p>
    <p>With a reference later in the document defining the URL location:</p>
    <h2>Plugins</h2>
    <p>The killer feature of <code>markdown-it</code> is very effective support of
      <a href="https://www.npmjs.org/browse/keyword/markdown-it-plugin">syntax plugins</a>.</p>
    <h3><a href="https://github.com/markdown-it/markdown-it-emoji">Emojies</a></h3>
    <blockquote>
      <p>Classic markup: </p>
      <p>Shortcuts (emoticons):</p>
    </blockquote>
    <p>see <a href="https://github.com/markdown-it/markdown-it-emoji#change-output">how to change output</a> with twemoji.</p>
    <h3><a href="https://github.com/markdown-it/markdown-it-sub">Subscript</a> / <a href="https://github.com/markdown-it/markdown-it-sup">Superscript</a></h3>
    <ul>
      <li>19<sup>th</sup></li>
      <li>H<sub>2</sub>O</li>
    </ul>
    <h3><a href="https://github.com/markdown-it/markdown-it-ins">&lt;ins&gt;</a></h3>
    <p><ins>Inserted text</ins></p>
    <h3><a href="https://github.com/markdown-it/markdown-it-mark">&lt;mark&gt;</a></h3>
    <p><mark>Marked text</mark></p>
    <h3><a href="https://github.com/markdown-it/markdown-it-footnote">Footnotes</a></h3>
    <p>Footnote 1 link<sup className="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>.</p>
    <p>Footnote 2 link<sup className="footnote-ref"><a href="#fn2" id="fnref2">[2]</a></sup>.</p>
    <p>Inline footnote<sup className="footnote-ref"><a href="#fn3" id="fnref3">[3]</a></sup> definition.</p>
    <p>Duplicated footnote reference<sup className="footnote-ref"><a href="#fn2" id="fnref2:1">[2:1]</a></sup>.</p>
    <h3><a href="https://github.com/markdown-it/markdown-it-deflist">Definition lists</a></h3>
    <dl>
      <dt>Term 1</dt>
      <dd>
        <p>Definition 1
          with lazy continuation.</p>
      </dd>
      <dt>Term 2 with <em>inline markup</em></dt>
      <dd>
        <p>Definition 2</p>
        <pre><code>{"  "}{"{"} some code, part of Definition 2 {"}"}{"\n"}</code></pre>
        <p>Third paragraph of definition 2.</p>
      </dd>
    </dl>
    <p><em>Compact style:</em></p>
    <dl>
      <dt>Term 1</dt>
      <dd>Definition 1</dd>
      <dt>Term 2</dt>
      <dd>Definition 2a</dd>
      <dd>Definition 2b</dd>
    </dl>
    <h3><a href="https://github.com/markdown-it/markdown-it-abbr">Abbreviations</a></h3>
    <p>This is <abbr title="Hyper Text Markup Language">HTML</abbr> abbreviation example.</p>
    <p>It converts “<abbr title="Hyper Text Markup Language">HTML</abbr>”, but keep intact partial entries like “xxxHTMLyyy” and so on.</p>
    <h3><a href="https://github.com/markdown-it/markdown-it-container">Custom containers</a></h3>
    <div className="warning">
      <p><em>here be dragons</em></p>
    </div>
    <hr className="footnotes-sep" />
    <section className="footnotes">
      <ol className="footnotes-list">
        <li id="fn1" className="footnote-item"><p>Footnote <strong>can have markup</strong></p>
          <p>and multiple paragraphs. <a href="#fnref1" className="footnote-backref">↩︎</a></p>
        </li>
        <li id="fn2" className="footnote-item"><p>Footnote text. <a href="#fnref2" className="footnote-backref">↩︎</a> <a href="#fnref2:1" className="footnote-backref">↩︎</a></p>
        </li>
        <li id="fn3" className="footnote-item"><p>Text of inline footnote <a href="#fnref3" className="footnote-backref">↩︎</a></p>
        </li>
      </ol>
    </section>
  </div>
)

export default TestHtml