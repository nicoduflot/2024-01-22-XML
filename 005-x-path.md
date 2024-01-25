# X-Path

C'est un moyen de cibler un élément dans "l'arbre XML"

## Chemins absolus et relatifs

### Absolu

on part de la racine vers un élément du document (xml, html)
ici /repertoire est le départ (la racine) du chemin xpath en absolu
Si je veux récupérer toutes les balises <telephone> avec l'attribut type="fixe"
```
racine répertoire
    noeud enfant personne
        noeud enfant telephones
            noeuds enfants telephone avec attribut type="fixe"
```
```
/repertoire/personne/telephones/telephone[@type="fixe"]
```

### Relatif

on ne part pas de la racine mais d'un élément (noeud) déterminé, et en empruntant des axes, on récupère les informations selon des directive précises

retrouver les noms des personnes ayant un numéro de téléphone avec type="portable"
```
noeud telephone type="portable"
    remonter au noeud parent telephones
        aller sur le noeud frère nom
```
```
telephone type="portable" => axe noeud parent = noeud frère nom 
```
On localise alors les données par : 
- un axe (la direction d'un endroit vers un autre, vers les ancètres, les descendants ou les frères et soeurs)
- un noeud ciblé
- facultatif : un ou plusieurs prédicats => des conditions sur le / les noeud·s ciblé·s / parcouru·s
    - les attributs (présence, non présence + valeur donnée ou liste de valeurs données )
    - la position (nième, le premier, le dernier, etc.)
```
axe::noeud[predicat][predicat]...[predicat]/axe::noeud[predicat][predicat]...[predicat]
```
#### exemple de chemin absolu

depuis le xml repertoire, repérer en chemin absolu le pays où vivent les personnes

1 noeud répertoire
2 noeud personne
3 noeud adresse
4 noeud pays

chaque étape au format xpath

1 child::repertoire
2 child::personne
3 child::adresse
4 child::pays

Le chemin complet en xpath
```
/child::repertoire/child::personne/child::adresse/child::pays
```
child c'est la direction (l'axe) par défaut, on peut ne pas l'écrire
```
/repertoire/personne/adresse/pays
```
Depuis la racine, repérer tous les commentaires des noeuds descendants
```
/descendant::comment()
```
Depuis la racine, repérer tous les contenus texte des noeuds descendants
```
/descendant::text()
```
#### exemple de chemin relatif

depuis telephones, repérer le pays indiqué dans adresse
1 remonter  au noeud frère précédent adresse
2 descendre au noeud enfant pays
```
/descendant-or-self-node::node()/telephones/preceding-sibling::adresse/pays
```
on va devoir dire à xpath, sur XML Copy editor, que l'on pars des déscendant du noeud ou de lui même
```
/descendant-or-self-node::node()/ => //
/descendant-or-self-node::node()/telephones => //telephones

//telephones/preceding-sibling::adresse/pays
```
Les noms des personnes ayant inscrit un email personnel
```
//email[@type="personnel"]/../../nom
```
on part d'un élément <email> avec l'attribut type = à personnel, on remonte au parent <emails>, puis au parent <personne> et depuis <personne> à l'enfant <nom>
```
//email[@type="personnel"]/../preceding-sibling::nom
```
on part d'un élément &lt;email&gt; avec l'attribut type = à personnel, on remonte au parent &lt;emails&gt;, ensuite on cherche dans les noeuds frères précédents l'élément &lt;nom&gt;

##### Quelques abbréviation
```
/descendant-or-self-node::node()/ => //
```
self::node() => .
```
/repertoire/personne/adresse/self::node()
/repertoire/personne/adresse/. 
//adresse/.
```
Vers un noeud parent en chemin relatif

parent::node() => ..
```
//email/../../telephones/telephone
```
#### Prédicats

téléphone avec l'attribut type = bureau depuis email
```
//email/../../telephones/telephone[attribute::type="bureau"]
```
il existe des wildcards, par exemple le caractère * représente n'importe quelle suite de caractère

//*[attribute::type] => mauvaise méthode car on récupère tous les noeud possedant un attribut nommé type

une bonne méthode 
```
//telephone[attribute::type="bureau"]
```
! => non (abbreviation de not() )
tous les téléphone non fixe
```
//telephone[not(attribute::type="fixe")]

//telephone[attribute::type!="fixe"]
```
tous les telephone non fixe et non bureau
```
//telephone[not(attribute::type="fixe")][not(attribute::type="bureau")]

//telephone[attribute::type!="fixe"][attribute::type!="bureau"]
```
dernier élément telephone
```
/descendant::telephone[last()]
```
tous les derniers éléments telephone
```
//telephone[last()]
```
position() => la position (de 1 à x) des éléments dans la liste xpath
last() le dernier élément de la liste
les balises telephone dont la position est strictement inférieure à la valeur de la position de la dernière balise de la liste
```
/descendant::telephone[position() < last()]
```
Position : premier élément telephone
```
/descendant::telephone[position() = 1]
```
compter tous les éléments d'un xml

- count(//*) compte tous les noeuds du xml
- count(//text()) compte tous les noeuds texte du xml
- count(//comment()) compte tous les noeuds commentaires du xml
- count(//telephone) compte tous les noeuds telephone du xml
```
count(/descendant::telephone[last()])
```
Compte tous les noeud qui sont "le dernier noeud telephone" 0 (s'il n'y en a pas) ou 1

### Abreviation
les attributs peuvent être abrégé avec de attribute:: à @
```
/descendant::telephone[attribute::type!="professionnel"][attribute::type!="bureau"]

/descendant::telephone[@type!="professionnel"][@type!="bureau"]

//telephone[@type!="professionnel"][@type!="bureau"]
```