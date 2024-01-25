## Les espaces de noms

Ils permettent d'utiliser des vocabulaires XML pré-établis.

Équivalent de "dialectes" XML qui ont été définis pour des utilisations diverses.
Plutôt que de redéfinir des dialects à chaque fois qu'on a besoin d'un document XML, on fait appel à eux.
Pour les utiliser, on défini ce qu'on appel un "espace de nom" => namespace c'est pour ça que dans le document
on écrira xmlns xml NameSpace.
Un espace de nom peut être définit par défaut, dans ce cas toutes les balises du document doivent
appartenir à ce dialecte,
ou il peut être utilisé partiellement, dans ce cas on lui définit un préfixe qui sera a mettre dans les balises
faisant référence à ce dialecte.

Un dialecte standard commun existe, le "Dublin Core", https://www.dublincore.org/specifications/dublin-core/dcmi-terms/ ,
il contient une quinzaine d'éléments dont title, creator, subject et date pour écrire les caractéristiques principale d'un 
document (métadonnées).

" DocBook " permet de décrire les les métadonnées d'un document https://tdg.docbook.org/tdg/5.1/ 

" XInclude https://www.w3.org/TR/xinclude/ permet d'inclure dans des fichiers XML d'autre fichiers XML

## Quelques espaces de noms communéments utilisés

XML
    http://www.w3.org/XML/1998/namespace 
XInclude
    http://www.w3.org/2001/XInclude 
XLink
    http://www.w3.org/1999/xlink 
MathML
    http://www.w3.org/1998/Math/MathML 
XHTML
    http://www.w3.org/1999/xhtml 
SVG
    http://www.w3.org/2000/svg 
Schémas
    http://www.w3.org/2001/XMLSchema 
Instances de schémas
    http://www.w3.org/2001/XMLSchema-instance 
Schematron
    http://purl.oclc.org/dsdl/schematron 
XSLT
    http://www.w3.org/1999/XSL/Transform 
XSL-FO
    http://www.w3.org/1999/XSL/Format 
DocBook
    https://tdg.docbook.org/tdg/5.1/ 
Dublin Core
    https://www.dublincore.org/specifications/dublin-core/dcmi-terms/ 