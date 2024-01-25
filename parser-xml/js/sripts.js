console.log('début chargement de la page')

function cEO(element, options = {}, parent = null){
    let newElement = document.createElement(element);
    for(let key in options){
        if(typeof options[key] === 'object'){
            let attr = options[key].join(' ');
            newElement.setAttribute(key, attr);
        }else{
            newElement.setAttribute(key, options[key]);
        }      
    }
    if(null !== parent){
        parent.appendChild(newElement)
    }
    return newElement;
}

function cTN(content, parent = null){
    let textNode = document.createTextNode(content);
    if(null !== parent){
        parent.append(textNode);
    }
    return textNode;
}

function erase_childs(node){
    if(node.childNodes){
        let childs = node.childNodes;
        while(childs.length > 0){
            node.removeChild(node.lastChild);
        }
    }
}

function parseXml(xmlData, html =''){
    /* le xml sera affiché sous la forme d'une liste avec des sous-listes */

    html = cEO('ul');

    /* on parcours les noeud enfant de la source de donnée */
    xmlData.childNodes.forEach(function(element){
        /* on ne gère pas les noeud texte ou commentaire */
        if(element.nodeName !== '#text' && element.nodeName !== '#comment'){
            /* si l'élément a un ou des enfants, c'est un conteneur */
            if(element.children.length !== 0){
                let li = cEO('li');
                let b = cEO('b');
                cTN(`${element.nodeName}`, b);
                li.appendChild(b);
                /* si l'élément possède des attributs */
                if(element.attributes.length > 0){
                    let ulAttr = cEO('ul', {class: ['attrList']});
                    for(attr of element.attributes){
                        let liAttr = cEO('li');
                        cTN(`attr : ${attr['name']} => ${attr['value']}`, liAttr);
                        ulAttr.appendChild(liAttr);
                    }
                    li.appendChild(ulAttr);
                }
                /* on envoi ce qu'il y a dans le conteneur dans la fonction qui parse, c'est la récursivité */
                html.appendChild(li);
                html.appendChild(parseXml(element, html));
            }else{
                /* s'il n'i a pas d'enfant, on sort de l'élément et on passe à l'élément suivent */
                let li = cEO('li');         
                let b = cEO('b');
                cTN(`${element.nodeName}`, b);
                li.appendChild(b);
                cTN(` : ${element.innerHTML}`, li);
                if(element.attributes.length > 0){
                    let ulAttr = cEO('ul', {class: ['attrList']});
                    for(attr of element.attributes){
                        let liAttr = cEO('li');
                        cTN(`attr : ${attr['name']} => ${attr['value']}`, liAttr);
                        ulAttr.appendChild(liAttr);
                    }
                    li.appendChild(ulAttr);
                }
                html.appendChild(li);
            }
        }
    });

    return html;

    
}

window.addEventListener('DOMContentLoaded', function () {
    console.log('éxécution du script')
    /* on récupère les boutons qui servent à lire des ressources xml */
    const xmlButtons = document.querySelectorAll('button[data-action="read-xml"]');
    /* on parcours les boutons  */
    xmlButtons.forEach(function (button) {
        /* on guette le clic sur chaque bouton */
        button.addEventListener('click', function () {
            /* à chaque click on récupère la ressource */
            let ressource = '';
            if(this.dataset.xmlsource !== ''){
                ressource = this.dataset.xmlsource;
            }else{
                let sourceUrl = document.querySelector('input[name="sourceUrl"').value;
                ressource = sourceUrl;
            }

            fetch(ressource)
                .then(function (reponse) {
                    /* si la ressource existe on récupère sa forme texte */
                    return reponse.text();
                })
                .then(function (xmlFlux) {
                    /* on crée un objet pour parser le dom */
                    const parser = new DOMParser();
                    /* parser contient une méthode pour transformer du texte en objet DOM */
                    const xmlDoc = parser.parseFromString(xmlFlux, 'application/xml');

                    /* on vérifie si c'est du rss ou non */
                    if(xmlDoc.children[0].tagName === 'rss'){
                        /* si c'est du rss, on récupère le DOM à l'intérieur de la balise prologue <rss ... ></rss> */
                        data = xmlDoc.children[0].children[0];
                    }else{
                        /* si ce n'est pas du rss, on récupère directement le contenu du xml */
                        data = xmlDoc.children[0];
                    }

                    /* on envoi les données dans notre fonction qui servira a afficher la source à l'écran */

                    const list = parseXml(data);

                    let affichage = document.querySelector('.xml-content');

                    erase_childs(affichage);

                    affichage.appendChild(list);
                    
                })
                .catch(function (erreur) {
                    console.log(erreur);
                })
                .finally(function () {
                    console.log('Fin de la transaction');
                })
        });
    })
});
