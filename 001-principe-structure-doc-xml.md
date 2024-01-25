# XML

## Principe
C’est un langage balisé, on utilise des balises similaires aux balises HTML, à la différence que les balises créées peuvent être nommées au besoin (du format de données) selon les règles suivantes.

### Les règles de nommage des balises 

- Les noms peuvent contenir des lettre, des chiffres ou des caractères spéciaux
- Les noms doivent OBLIGATOIREMENT débuter par une lettre ou un underscore
```
<5test /> => interdit
<test5 /> => valide
```
- Les noms NE PEUVENT PAS commencer avec les lettre XML (quelle que soit la casse)
- Les noms NE PEUVENT PAS contenir d'espaces.
- Les caractères spéciaux interdits : - , ; . < > 

### Il existe deux type de balises : 

**Balises par paire**

```
<balise>donnée</balise>
<balise>
    <autreBalise>Donnée</autreBalise>
</balise>

<nom>Duflot</nom>

<personne type="physique">
    <nom>Duflot</nom>
    <prenom>Nicolas</prenom>
    <prenom>Eric</prenom>
    <prenom></prenom>
    <!-- on peut aussi écrire <prenom /> -->
</personne>
```

**Et les balises uniques**
```
<nom valeur="Duflot" />
<prenom valeur="Nicolas" />
<prenom valeur="Eric" />
```
Les balises vont contenir des attributs, pour des options ou des informations "cachées", se sont des compléments d'informations sur la données des balises XML.

Les règles de nommage des attributs : 
 - Idem que pour les noms de balises
 - Les valeurs des attributs doivent être limitées entre des guillemets 'simples' ou "doubles"
 - Dans une balise, un attribut ne sera présent qu'une et une seule fois

**Quelques exemples (prix d'un article): **
```
<article>
    <nom>
        Mug Holder Goldorak
    </nom>
    <reference>
        MUG-ANIME-Grendizer-01
    </reference>
    <!-- liste des prix selon les devises acceptées -->
    <prix total="25.3" devise="EURO" />
    <prix total="26.68" devise="USD" />
</article>
```
ou 
```
<article>
    <nom>
        Mug Holder Goldorak
    </nom>
    <reference>
        MUG-ANIME-Grendizer-01
    </reference>
    <!-- liste des prix selon les devises acceptées -->
    <prix>
        <total>25.3</total> 
        <devise>EURO</devise>
    </prix>
    <prix>
        <total>26.68</total> 
        <devise>USD</devise>
    </prix>
</article>
```
ou
```
<article>
    <nom>
        Mug Holder Goldorak
    </nom>
    <reference>
        MUG-ANIME-Grendizer-01
    </reference>
    <!-- liste des prix selon les devises acceptées -->
    <prix devise="EURO">25.3</prix>
    <prix devise="USD">260.68</prix>
</article>
```

## Le corps d'un document se compose comme suite : 

### un prologue

Une balise racine, c'est elle qui est l'ancètre des toutes les informations du document

Un document XML bien formé suit donc les règles suivantes : 
 - Un prologue xml (contenant la version xml utilisée et s'il est seul ou s'il utilise un document de formatage)
 - le document ne contient qu'une seule balise racine
 - le nom des balises et des attributs respectent les règles de nommage.
 - Les balises paires sont bien fermées
 - les valeurs des attributs sont contenues entre des guillemets simples ou doubles.
 - les balises du document ne se chevauchent pas, il y a une arborescence cohérente dans le document.