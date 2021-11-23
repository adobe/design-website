import { $wrap, $element, decorateDivisions, decorateTagLink,propsFromBlockLink } from "../../scripts/helpers.js";
export default async function decorate($block) {
    const $blocks = $block.querySelectorAll(":scope > div");
    for(const block of $blocks) {
      block.classList.add("seventy");
      convertBlockToUseProperties(block)

      let props = await propsFromBlockLink(block, {
        path: 'path',
        hed: 'title',
        dek: 'description',
        image: 'image',
        background: { field: "color", default: "red" },
        textcolor: { field: "textcolor", default: "white" },
        tag: { field: 'tags', default: '' },
      });
      const { properties } = decorateDivisions(block, null, { level: "child" });
      Object.assign(props, properties );
      
      const imageDiv = block.querySelector("div:nth-child(1)");
      imageDiv.classList.add("image")
      

      const contentDiv = $element('.content')

      const HED_TEXT_LIMIT = 50;
      const DEK_TEXT_LIMIT = 75;

      if(!!props.tag)
      contentDiv.append(decorateTagLink($element("p.tag", ['#', $element('span.tag', props.tag)]), props.tag.replaceAll(' ', '-')))
      if(!!props.hed){
        let hedText = props.hed.length<HED_TEXT_LIMIT ? props.hed:props.hed.substring(0,HED_TEXT_LIMIT-3)+'...';
        contentDiv.append($element("h2.hed", hedText))
      }
      if(!!props.dek){
        let dekText = props.dek.length<DEK_TEXT_LIMIT ? props.dek:props.dek.substring(0,DEK_TEXT_LIMIT-3)+'...';
        contentDiv.append($element("h3.dek", dekText))
      }
      if(!!props.author)
        contentDiv.append($element("p.byline", props.author))
      if(!!props.position)
        contentDiv.append($element("p", props.position))

      let path;
      if(props.path)
        path = props.path
      else{
        path = `/stories/${props.tag}/${props.hed}`
        path = path.replaceAll(' ', '-').replaceAll(/[^a-zA-Z-\d/:]/g, '').toLowerCase()
      }
      const articleLink = $element('a.stories-link.seventy-link', { attr: { href: path } })

      articleLink.append(imageDiv)
      articleLink.append(contentDiv)

      block.append(articleLink)

    }
  }
  

  function convertBlockToUseProperties(block){
    const rawSection = block.querySelector("div:nth-child(2)")

    if(!rawSection)
      return
    
    if(rawSection.querySelector(":nth-child(1)").innerHTML.toUpperCase().includes("PROPERTIES"))
      return

    const propSection = $element('.props')
    
    let tag = rawSection.querySelector(":nth-child(1)")
    let hed = rawSection.querySelector(":nth-child(2)")
    let dek = rawSection.querySelector(":nth-child(3)")
    let author = rawSection.querySelector(":nth-child(4)")
    let position = rawSection.querySelector(":nth-child(5)")

    propSection.append($element('p', 'PROPERTIES'))
    propSection.append($element('p', `Tag: ${tag.innerHTML.replaceAll('#', ' ').toUpperCase()}`))
    propSection.append($element('p', `hed: ${hed.innerHTML}`))
    propSection.append($element('p', `dek: ${dek.innerHTML}`))
    propSection.append($element('p', `author: ${author.innerHTML}`))
    if(!!position){
      propSection.append($element('p', `position: ${position.innerHTML}`))
    }

    rawSection.remove()
    block.append(propSection)
  }