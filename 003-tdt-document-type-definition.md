# Les DTD
Document Type Definition

Se sont des fichiers de défintions qui permettent de définir une structrue stricte aux document XML

Ces règles permettent de définir la façon dont les document XML doit être écrit, si des balises doivent être absolument présentes ou imposer le type d'une donnée contenue dans une balise.

QUand un XML est soumis à des DTD, il faut vérifier qu'il soit valide, c'est-à-dire conforme aux DTD.

Se sont donc des normes d'écriture, qui sont utiles quand un document est écrit par plusieurs personnes, pour aussi pouvoir le comprendre et l'exploiter, car le XML est un langage qui permet de communiquer des données par le web, donc les normes de formatage sont importantes.

## Deux type de DTD

externe et interne

- externe : elles sont écrites sur un autre fichier avec l'extension .dtd 
- interne : elles sont écrites dans le fichier xml qu'elles définissent.

## Syntaxe
une balise :
```
<!ELEMENT balise (contenu)>
```
contenu : ce que va contenir la balise, une donnée ou une autre balise (ordre, fréquence, etc.)

un attribut
```
<!ATTLIST balise nomAttribut option>
```
option 
- Le type de la donnée (chaîne de caractère, identifiant, etc.)
- des valeurs imposées ou non, par défaut
- l'obligation d'avoir l'attribut

Sur le XML suivant : 
```
<contact>
    <nom>Durand</nom>
</contact>
```

**balise contact**
```
<!ELEMENT contact (nom)>
```
**balise nom**
```
<!ELEMENT nom (#PCDATA)>
```
**si la balise doit être vide**
```
<source src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
```
en DTD
```
<!ELEMENT source EMPTY>
    <!-- mais elle contient un attribut -->
    <!ATTLIST source src CDATA>
```

la balise prenom et la balise age peuvent être vides ou non
```
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<rolodex>
    <contact>
        <nom>Duflot</nom>
        <prenom>Nicolas</prenom>
        <age>44</age>
    </contact>
    <contact>
        <nom>ACME Inc</nom>
        <prenom></prenom>
        <age></age>
    </contact>
</rolodex>
```
**Élément prenom**
```
<!ELEMENT prenom ANY>
```

**la balise contient de une à x autre balise du même nom**
```
<!ELEMENT rolodex (contact+)>
```
+ indique qu'il faut au moin une balise contact dans ROLODEX

**en DTD le xml précédent**
```
<!ELEMENT rolodex (contact+)>
    <!ELEMENT contact (nom, prenom, age)>
        <!ELEMENT nom (#PCDATA)>
        <!ELEMENT prenom (#PCDATA)>
        <!ELEMENT age (#PCDATA)>
```
**Si le xml ne fait pas apparaître les balises vide**

```
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<rolodex>
    <contact>
        <nom>Duflot</nom>
        <prenom>Nicolas</prenom>
        <age>44</age>
    </contact>
    <contact>
        <nom>ACME Inc</nom>
    </contact>
    <contact>
        <prenom>Tantine</prenom>
        <age>74</age>
    </contact>
</rolodex>
```
le DTD
```
<!ELEMENT rolodex (contact*)>
    <!-- ici, * indique qu'on pourrait avoir de 0 à X contact-->
    <!ELEMENT contact (nom | prenom, age?)>
    <!-- ici, ? indique que la balise peut être présente une seule fois ou pas du tout -->
```

## les attributs -->
```
<!ELEMENT balise (contenu)>
    <!ATTLIST balise attr> 
```
attr est la définition plus ou moins complexe de l'attribut

Attribut type identifiant unique
```
<contact numero="n-1"></contact>
```
En DTD
```
<!ELEMENT contact ANY>
    <!ATTLIST contact numero ID #REQUIRED>
```
### Propriété de présence des attributs

|forme               |signification                                     |
|--------------------|--------------------------------------------------|
|#IMPLIED            |Attribut facultatif                               |
|#REQUIRED           |Attribut obligatoire                              |
|#FIXED valeur       |Attribut avec cette valeur, non modifiable        |
|valeur              |Attribut avec cette valeur par défaut etmodifiable|

### ID et IDREF

Attribut utilisant le principe de référence (qui font référérence à) un attribut de valeur unique
```
<!ELEMENT contact ANY>
    <!ATTLIST contact personne (physique | morale) "physique">
    <!ATTLIST contact numero ID #REQUIRED>

<!ELEMENT adresse ANY>
    <!ATTLIST adresse type (facturation | livraison)>
    <!ATTLIST adresse useradresse IDREF #REQUIRED>
```
Exemple en XML 
```
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<rolodex>
    <contacts>
        <contact personne="physique" numero="n-01">
            ....
        </contact>
        <contact personne="physique" numero="n-02">
            ....
        </contact>
        <contact personne="morale" numero="n-03">
            ....
        </contact>
    </contacts>
    <adresses>
        <adresse type="facturation" useradresse="n-01">
            
        </adresse>
        <adresse type="livraison" useradresse="n-01">
            
        </adresse>
        <adresse type="facturation" useradresse="n-02">
            
        </adresse>
        <adresse type="livraison" useradresse="n-03">
            
        </adresse>
        <adresse type="facturation" useradresse="n-03">
            
        </adresse>
    </adresses>
</rolodex>
```
#### Autre exemple ID IDREF
```
<artist name="Nick Cave" artistid="NC" />
<album name="Murder Ballads" albumartistid="NC" />
<album name="The boatman's call" albumartistid="NC" />
```
En DTD
```
<!ELEMENT artist EMPTY>
    <!ATTLIST artist name CDATA #REQUIRED>
    <!ATTLIST artist artistid ID #REQUIRED>
<!ELEMENT album EMPTY>
    <!ATTLIST album name CDATA #REQUIRED>
    <!ATTLIST album albulartistid IDREF #IMPLIED>
```
### ID ET IDREFS 
Plusieurs éléments référencent le même élément

```
<!ELEMENT artist EMPTY>
    <!ATTLIST artist name CDATA #REQUIRED>
    <!ATTLIST artist artistid ID #REQUIRED>

<!ELEMENT album EMPTY>
    <!ATTLIST album name CDATA #REQUIRED>
    <!ATTLIST album albumartistid IDREFS #IMPLIED>
```
Exemple en XML 
```
<artist name="Korn" artistid="K-0001" />
<artist name="Ice Cube" artistid="IC-0002" />
<artist name="Incubus" artistid="I-0003" />
<artist name="Limp Bizkit" artistid="LB-0004" />
<artist name="Orgy" artistid="O-0005" />
<album name="Follow the leader" albumartistids="K-0001" />
<album name="Family values tour '98" albumartistids="K-0001 IC-0002 I-0003 LB-0004 O-0005" />
```
### Attibuts avec des valeur par défaut
```
<!ATTLIST contact personne (physique | morale) "physique">
```
Xml valides et invalides
```
<!-- valide -->
<contact personne="physique"></contact>
<!-- valide -->
<contact personne="morale"></contact>
<!-- valide mais considéré par défaut comme physique -->
<contact personne=""></contact>
<!-- invalide -->
<contact personne="toto"></contact>
```
### Les constantes
- Si l'attribut est présent dans la balise, il doit avoir une valeur définie.

- S'il n'est pas présent dans la balise, il sera défini par défaut
```
<!ATTLIST prix devise CDATA #FIXED "euro">
```
Xml valides et invalides
```
<!-- valide -->
<prix devise="euro">12</prix>
<!-- valide la devise sera euro-->
<prix>12</prix>
<!-- invalide : la devise DOIT être "euro" -->
<prix devise="USD">12</prix>
```
## Les entités :
Se sont des alias qui permettent de réutiliser des informations dans le document xml OU dans les DTD
- générales
- paramètres
- externes

### Entité générale

Associe un alias à une information dans le document

```
<!ENTITY dacia "DACIA">
<!ENTITY renault "RENAULT">
<!ENTITY citroen "CITROËN">
```
Exemple XML 
```
<voiture>
    <marque>&dacia;</marque>
</voiture>
<voiture>
    <marque>&renault;</marque>
</voiture>
<voiture>
    <marque>&citroen;</marque>
</voiture>
```

Le xml est "interprété" comme suit
```
<voiture>
    <marque>DACIA</marque>
</voiture>
<voiture>
    <marque>RENAULT</marque>
</voiture>
<voiture>
    <marque>CITROËN</marque>
</voiture>
```

### eEntité paramètre
- Elle n'apparait que dans les DTD
- Elle associe un alias à une partie de la déclaration dans les DTD
- **NE FONCTIONNE PAS AVEC LES ATTRIBUTS**

```
<parking>
    <voiture marque="Dacia" />
    <voiture marque="Renault" />
    <voiture marque="Citroën" />
    <camion marque="BMW" />
</parking>
```
**DTD Classique pour l'élément parking**
```
<!ELEMENT parking (voiture, camion)*>
```
**Avec l'entité paramètre**
```
<!ENTITY % lot "(voiture, camion)*">
<!ELEMENT voiture %lot>
```
**Autre exemple**
```
<!ENTITY % identite "nom?, prenom?">
<!ELEMENT contact (%identite, surnom)>
<!ELEMENT personnage (%identite, acteur)>
```
**En DTD classique**
```
<!ELEMENT contact (nom?, prenom?, surnom)>
<!ELEMENT personnage (nom?, prenom?, acteur)>
```

### entité externe 
Permet de faire une référence, comme les entité générale, à des information a utiliser dans le document xml.
Mais elles sont écrite dans un fichier externe

```
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!ENTITY dacia SYSTEM "./parking/dacia.xml">
<!ENTITY renault SYSTEM "./parking/renault.xml">
<!ENTITY citroen SYSTEM "./parking/citroen.xml">

<!ELEMENT parking(voiture*)>

<parking>
    <voiture>
        %dacia;
    </voiture>
    <voiture>
        %renault;
    </voiture>
    <voiture>
        %citroen;
    </voiture>
</parking>
```
dacial.xml
```
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<!DOCTYPE description [
    <!ELEMENT description (marque, modele, portes)>
    <!ELEMENT marque (#PCDATA)>
    <!ELEMENT modele (#PCDATA)>
    <!ELEMENT portes (#PCDATA)>
] >
<description>
    <marque>
        Dacia
    </marque>
    <modele>
        Sandero
    </modele>
    <portes>
        5
    </portes>
</description>
```
renault.xml
```
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<!DOCTYPE description [
    <!ELEMENT description (marque, modele, portes)>
    <!ELEMENT marque (#PCDATA)>
    <!ELEMENT modele (#PCDATA)>
    <!ELEMENT portes (#PCDATA)>
] >
<description>
    <marque>
        Renault
    </marque>
    <modele>
        Clio
    </modele>
    <portes>
        3
    </portes>
</description>
```
citroen.xml
```
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<!DOCTYPE description [
    <!ELEMENT description (marque, modele, portes)>
    <!ELEMENT marque (#PCDATA)>
    <!ELEMENT modele (#PCDATA)>
    <!ELEMENT portes (#PCDATA)>
] >
<description>
    <marque>
        Citroën
    </marque>
    <modele>
        DS3
    </modele>
    <portes>
        5
    </portes>
</description>
```