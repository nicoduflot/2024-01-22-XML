# XSD - XML Schema Definition
Autre schéma de validation XML : XSD (Xml Schema Definition)

## Pourquoi ? 

les DTD ne sont pas au format XML, c'est un nouveau langage avec sa propre syntaxe et ses règles.
> il faut l'utiliser avec xml et il se peut que certaines API liront le XML et les DTD de façons différentes?
Enfin, on ne peut pas typer les données, on indique juste qu'une balise contient ou non des données 
mais impossible de préciser si c'est une chaîne de caractère, un nombre, etc.

Le xsd permet de typer les données, il est plus précis sur l'écriture des contraintes, il s'écrit en xml, 
se stocke dans un fichier externe ayant l'extension .xsd, il utilise comme les fichiers xml un prologue 
dont le nom de l'élément racine nous est imposé

Les xsd sont soit écrits dans un fichier externe (standalone="no").

Ils s'écrivent dans un fichier avec l'extension .xsd, ils possèdent un prologue proche du prologue des fichiers .xml

## Prologue d'un fichier xsd
```
<?xml version="1.0" encoding="UTF-8"?>
```
**L'élément racine d'un fichier xsd est imposé**
```
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <!-- déclaration du schéma du fichier xml -->
</xsd:schema>
```
On déclare un espace de nom avec xmlns:xsd, de fait, tous les éléments du xsd seront préfixés par xsd:

il faut ensuite rattacher ce fichier de schéma au xml concerné par le xsd
il faut déclarer l'attachement du fichier dans la balise racine du xml
mais pour appeler ce fichier il faut utiliser le vocabulaire schema-instance

**xml appelant un xsd en ne décrivant pas d'espace de nom**
```
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<agenda xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="./definition/agenda.xsd">
    <contact>
        <nom clientid="CL-001">Durant</nom>
    </contact>
    <garage>
        <voiture client="CL-001">
            <marque>
                Opel
            </marque>
        </voiture>
    </garage>
</agenda>
```
Si les parties du xml sont définies par différents xsd : on déclare des espace de nom pour chaque xsd
```
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<agenda xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:schemalocation="urn:Contact ./definition/contact.xsd"
    xsi:schemalocation="urn:Garage ./definition/garage.xsd"
    >
    <Contact:contact xmlns:Contact="urn:Contact">
        <Contact:nom>Durant</Contact:nom>
    </Contact:contact>
    <Garage:garage xmlns:Garage="urn:Garage">
        <Garage:voiture>
            <Garage:marque>
                Opel
            </Garage:marque>
        </Garage:voiture>
    </Garage:garage>
</agenda>
```
On peut aussi l'écrire comme ça
```
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<agenda xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:schemalocation="./definition/ agenda.xsd ./definition/ contact.xsd ./definition/ garage.xsd"
    xmlns:dc="https://www.dublincore.org/specifications/dublin-core/dcmi-terms/" 
    >
    <dc:creator>
        Nicolas Duflot
    </dc:creator>
    <contact>
        <nom>Durant</nom>
    </contact>
    <garage>
        <voiture>
            <marque>
                Opel
            </marque>
        </voiture>
    </garage>
</agenda>
```
## Déclaration des éléments
Deux type d'éléments : simples et complexes

**Élément simple : **
une balise, sans attribut, ne contenant pas d'autre balise, dont le type de donnée contenu est simple

**Élément comlexe : **
une balise qui contient d'autre balise, ou que le type de donnée est complexe, ou qu'elle contient au moins un attribut.

ni attribut, ni balise, ni type de donnée complexe : élément simple
```
<nom>Duflot</nom>
```
ou un attribut, ou une autre balise, ou un type de donnée complexe : élément complexe
```
<personne type="physique">Nicolas Duflot</personne>
```
Élément complexe, contient d'autres balises
```
<personne>
    <!-- élément complexe, un attribut -->
    <nom type="usage">
        Duflot
    </nom>
    <!-- élément complexe, un attribut -->
    <nom type="jeune-fille">
        Decroix
    </nom>
    <!-- élément simple, pas d'attribut, pas de balise, donnée type simple -->
    <prenom>
        Tiphaine
    </prenom>
</personne>
```
### Déclarer un élément simple
mot clef : element (avec le namespace déterminé pour le schema)

```
<nom>Duflot</nom>
<prenom>Nicolas</prenom>
<age>43.66</age>
```
En xsd
```
<xsd:element name="nom" type="xsd:string" />
<xsd:element name="prenom" type="xsd:string" />
<xsd:element name="age" type="xsd:float" />
```
#### Valeur par défaut
```
<xsd:element name="nom" type="xsd:string" default="Doe" />
<xsd:element name="prenom" type="xsd:string" default="John" />
<xsd:element name="age" type="xsd:float" />
```
Quelques xml validés avec cette définition
```
<nom>Duflot</nom>
<prenom>Nicolas</prenom>
<age>44</age>

<nom></nom> <!-- par défaut "Doe" -->
<prenom>Nicolas</prenom>
<age>43</age>

<nom>Duflot</nom>
<prenom></prenom> <!-- défaut "John" -->
<age>43</age>

<nom></nom> <!-- par défaut "Doe" -->
<prenom></prenom> <!-- défaut "John" -->
<age></age> <!-- age non renseigné mais non obligatoire -->
```
#### valeur constante 
Valeur inchangeable, imposée et non valide si vide
```
<xsd:element name="status" type="xsd:string" fixed="Employé·e" />
```
En xml
```
<!-- valide -->
<status>Employé·e</status>
<!-- Invalide -->
<status>Alternant</status>
<!-- Invalide -->
<status></status>
```
### Les attributs
Se sont par essence des éléments simples, et le mot clef pour les déclarer 
n'est pas element mais attribute (ne pas oublier le namespace xsd)

on déclare un attribut avec les attributs name et type

```
<personne type="physique" />
```
Attribut type de personne
```
<xsd:attribute name="type" type="xsd:string" />
```
la déclaration de cet attribut intervient évidement lors de la déclaration de l'élément personne, qui lui est un élément complexe, on verra sa déclaration plus tard.

#### Valeurs par défaut, inchangeables (constantes), obligatoires

**valeurs par défaut**
```
<xsd:attribute name="type" type="xsd:string" default="physique" />
```
**constante**
```
<xsd:attribute name="devise" type="xsd:string" fixed="euro" />
```
En xml
```
<prix devise="euro">12.3</prix> <!-- valide -->
<prix devise="USD">12.3</prix> <!-- invalide -->
<prix devise="">12.3</prix> <!-- invalide -->
<prix>12.3</prix> <!-- invalide car l'attribut déclaré pour prix doit être présent dans prix -->
```
**attribut obligatoire**
```
<xsd:attribute name="type" type="xsd:string" use="required" />
```
En Xml
```
<!-- valide -->
<personne type="physique" />
<personne type="morale" />
<!-- invalide -->
<personne type="" />
```

### les types de valeurs pour les éléments et les attributs
**string**
```
<xsd:element name="string" type="xsd:string" />
```
En xml
```
<string>Karamasov</string>
<string>Une phrase choc</string>
<!-- certains caractères spéciaux doivent être écrits sous leur forme HTML -->
<string>&amp;</string>
```
**language**
```
<xsd:element name="langue" type="xsd:language" />
```
**Norme code langue**
>deux lettres de base ISO 639 (code de la langue)
peut être suivi par deux lettres ISO 3166 (code du pays)
- xx      (seul le code langue)
- xx-YY   (code langue-code pays)

```
<langue>fr-FR</langue>
<langue>fr-CA</langue>
<langue>en</langue>
<langue>en-US</langue>
<langue>en-GB</langue>
<langue>en-CA</langue>
```
**nmtoken**
string sans espace et seulement avec les caractère spéciaux . - _ : 
```
<xsd:attribute name="mytoken" type="xsd:NMTOKEN" />
```
En Xml
```
<balise mytoken="A:B_b-2.c">Contenu de la balise</balise>
```
**nmtokens**
liste de nmtoken séparé par un espace
```
<xsd:attribute name="mytokens" type="xsd:NMTOKENS" />
```
En xml
```
<balise mytokens="A:B_b-2.c">Contenu de la balise</balise>
<balise mytokens="A:B_b-2.c AZERTY 123456 toto">Contenu de la balise</balise>
```
**ID &amp; IDREF**
```
<xsd:attribute name="num" type="ID" />
<xsd:attribute name="parent" type="IDREF" />
```
En xml
```
<personne num="P-01">Paul</personne>
<personne num="P-02">JP</personne>
<personne num="P-03" parent="P-01">Clotaire</personne>
<personne num="P-04" parent="P-02">Martin</personne>
<personne num="P-05" parent="P-02">Camille</personne>
```
**ID & IDREFS**
```
<xsd:attribute name="num" type="ID" />
<xsd:attribute name="parents" type="IDREFS" />
```
En xml
```
<personne num="P-01">Paul</personne>
<personne num="P-02">JP</personne>
<personne num="P-03">Marie</personne>
<personne num="P-04" parents="P-02 P-03">Martin</personne>
<personne num="P-05" parents="P-01 P-03">Camille</personne>
<personne num="P-06" parents="P-01">Clotaire</personne>
<personne num="P-07" parents="P-03">Paul</personne>
```

#### Entity
entity permet de faire référence à des entités, le plus souvent non XML et déclarés dans les fichiers DTD
Ce type n'est a utiliser que pour les attributs

**Déclaration dans le xsd**
```
<xsd:attribute name="marque" type="xsd:ENTITY" />
```
**Déclaration des entité dans le doctype du xml**
```
<!ENTITY samsung "Samsung">
<!ENTITY apple "Apple">
```
Exemple valide dans le xml
```
<telephone marque="samsung">Galaxy SII</telephone>
<telephone marque="apple">Iphone 45</telephone>
```
#### Entities
```
<xsd:attribute name="marque" type="xsd:ENTITIES" />
```
**déclaration des entité dans le doctype du xml**
```
<!ENTITY samsung "Samsung">
<!ENTITY apple "Apple">
```
**exemple valide dans le xml**
```
<telephone marque="samsung apple" />
```
## les éléments complexes

### élément complexe : contient d'autres balises
```
<personne>
    <!-- élément complexe, un attribut -->
    <nom type="usage">
        Duflot
    </nom>
    <!-- élément complexe, un attribut -->
    <nom type="jeune-fille">
        Caron
    </nom>
</personne>
```
**Déclaration de personne**
```
<xsd:element name="personne">
    <xsd:complexType>
        <!-- déclaration du type complexe de personne -->
    </xsd:complexType>
</xsd:element>
```
**Élément complexe avec du contenu simple**
```
<prix devise="euro">5600</prix>
<voiture marque="Renault" moteur="essence">Clio</voiture>
```
**Élément prix**
```
<xsd:element name="prix">
    <!-- indiquer qu'il s'agit d'un élément de type complexe -->
    <xsd:complexType>
        <!-- préciser que le contenu est simple -->
        <xsd:simpleContent>
            <!-- déclarer le contenu simple de la balise -->
            <xsd:extension base="xsd:positiveInteger">
                <!-- déclarer l'attribut de la balise -->
                <xsd:attribute name="devise" type="xsd:string" />
            </xsd:extension>
        </xsd:simpleContent>
    </xsd:complexType>
</xsd:element>
```
**Élément voiture**
```
<xsd:element name="voiture">
    <xsd:complexType>
        <xsd:simpleContent>
            <xsd:extension base="xsd:string">
                <xsd:attribute name="marque" type="xsd:string" />
                <xsd:attribute name="moteur" type="xsd:string" />
            </xsd:extension>
        </xsd:simpleContent>
    </xsd:complexType>
</xsd:element>
```
#### balise avec attribut contenant d'autre balises
```
<personne type="physique">
    <prenom>John</prenom>
    <nom>Doe</nom>
</personne>
```
**En xsd**
```
<xsd:element name="personne">
    <xsd:complexType>
        <!-- sequence : toutes les balises dclarées à la suite doivent être présentes dans l'ordre indiqué -->
        <xsd:sequence>
            <xsd:element name="prenom" type="xsd:string" />
            <xsd:element name="nom" type="xsd:string" />
        </xsd:sequence>
        <!-- une fois que les balises (le contenu complexe) de l'élément sont déclarés, on déclare le ou les attributs de l'élément -->
        <xsd:attribute name="type" type="xsd:string" />
    </xsd:complexType>
</xsd:element>
```
> **ATTENTION** : sequence implique que l'ordre des balises dans le XML doivent être du même ordre que dans la déclaration.
En utilisant all au lieu de sequence, il est possible de déclarer les balises contenues dans n'importe quel ordre
#### balise avec attribut contenant d'autre balises
```
<personne type="physique">
    <nom>Doe</nom>
    <prenom>John</prenom>
</personne>
```
Certaines balises ne sont pas obligatoire, il est possible de les déclarer, dans une liste de choix, utilisée ou non
```
<xsd:element name="personne">
    <xsd:complexType>
        <!-- all : toutes les balises déclarées à la suite peuvent être présentes de 0 à une fois et l'ordre importe peu -->
        <xsd:all>
            <xsd:element name="prenom" type="xsd:string" />
            <xsd:element name="nom" type="xsd:string" />
        </xsd:all>
        <!-- une fois que les balises (le contenu complexe) de l'élément sont déclarés, on déclare le ou les attributs de l'élément -->
        <xsd:attribute name="type" type="xsd:string" />
    </xsd:complexType>
</xsd:element>
```
```
<personne type="physique">
    <nom>Doe</nom>
    <prenom>John</prenom>
</personne>
<personne type="Morale">
    <nom>DoGloboCorp Inc.</nom>
</personne>
<personne type="physique">
    <prenom>Stan le stan</prenom>
</personne>
```
En xsd
```
<xsd:element name="personne">
    <xsd:complexType>
        <xsd:all>
            <xsd:element name="prenom" type="xsd:string" />
            <xsd:element name="nom" type="xsd:string" />
        </xsd:all>
        <!-- une fois que les balises (le contenu complexe) de l'élément sont déclarés, on déclare le ou les attributs de l'élément -->
        <xsd:attribute name="type" type="xsd:string" />
    </xsd:complexType>
</xsd:element>
```
**Choice**
Seulement une des balises de la liste doit apparaître dans l'élément parent
```
<personne type="physique">
    <employe>Nicolas Duflot</employe>
</personne>
<personne type="physique">
    <client>Khellaf Fouad</client>
</personne>
<personne type="physique">
    <client>Palaric Laurent</client>
</personne>
```
En xsd
```
<xsd:element name="personne">
    <xsd:complexType>
        <xsd:choice>
            <xsd:element name="employee" type="xsd:string" />
            <xsd:element name="client" type="xsd:string" />
        </xsd:choice>
        <!-- une fois que les balises (le contenu complexe) de l'élément sont déclarés, on déclare le ou les attributs de l'élément -->
        <xsd:attribute name="type" type="xsd:string" />
    </xsd:complexType>
</xsd:element>
```
**Un type complexe dans un type complexe**
```
<personne>
    <identite>
        <nom>Vance</nom>
        <prenom>Jack</prenom>
    </identite>
</personne>
```
En xsd
```
<xsd:element name="personne">
    <xsd:complexType>
        <xsd:sequence>
            <xsd:element name="identite">
                <xsd:complexType>
                    <xsd:all>
                        <xsd:element name="nom" type="xsd:string" />
                        <xsd:element name="prenom" type="xsd:string" />
                    </xsd:all>
                </xsd:complexType>
            </xsd:element>
        </xsd:sequence>
    </xsd:complexType>
</xsd:element>
```
**Contenu mixte**
```
<description>
    Un·e <objet>console</objet> de <dimension>80x120cm</dimension> au prix de <prix devise="euro">150</prix>
</description>
<!-- équivalennt de : -->
<description>
    <objet>console</objet>
    <dimension>80x120cm</dimension>
    <prix devise="euro">150</prix>
</description>
```
En xsd
```
<xsd:element name="description">
    <!-- mais comme description contient aussi autre chose que des balise, il faut préciser que son contenu est mixte -->
    <xsd:complexType mixed="true">
        <xsd:sequence>
            <xsd:element name="objet" type="xsd:string" />
            <xsd:element name="dimension" type="xsd:string" />
            <xsd:element name="prix">
                <xsd:complexType>
                    <xsd:simpleContent>
                        <xsd:extension base="xsd:integer">
                            <xsd:attribute name="devise" type="xsd:string" />
                        </xsd:extension>
                    </xsd:simpleContent>
                </xsd:complexType>
            </xsd:element>
        </xsd:sequence>
    </xsd:complexType>
</xsd:element>
```
**Nombre d'occurence**
Nombre minimal et maximal d'occurence d'un élément dans un élément parent
```
<personne raisonsociale="physique">
    <nom>Robert</nom>
    <prenom>Axel</prenom>
    <prenom>Maurice</prenom>
    <prenom>Marcel</prenom>
</personne>
```
En xsd
```
<xsd:element name="personne">
    <xsd:complexType>
        <xsd:all>
            <xsd:element name="nom" type="xsd:string" />
            <xsd:element name="prenom" type="xsd:string" 
                minOccurs="1" 
                maxOccurs="3" />
            <!-- on peut aussi utiliser :
            <xsd:element name="prenom" type="xsd:string" 
                maxOccurs="3" />
            => la valeur par défaut de minOccurs est 1.
            -->
        </xsd:all>
        <xsd:attritbute name="raisonsociale" type="xsd:string" />
    </xsd:complexType>
</xsd:element>
```
**De 0 à X occurence**
```
<personne raisonsociale="physique">
    <nom>Robert</nom>
    <prenom>Axel</prenom>
    <prenom>Maurice</prenom>
    <prenom>Marcel</prenom>
    <prenom>Jean</prenom>
    <prenom>Michel</prenom>
</personne>
<personne raisonsociale="morale">
    <nom>GloboCorp Inc.</nom>
</personne>
```
En xsd
```
<xsd:element name="personne">
    <xsd:complexType>
        <xsd:all>
            <xsd:element name="nom" type="xsd:string" />
            <xsd:element name="prenom" type="xsd:string" 
                minOccurs="0" 
                maxOccurs="unbound" />
        </xsd:all>
        <xsd:attritbute name="raisonsociale" type="xsd:string" />
    </xsd:complexType>
</xsd:element>
```
### Réutiliser les types
Simplifier l'écriture et la lecture d'un schéma
```
<banque>
    <!-- 1er client -->
    <client>
        <identite>
            <nom>Adams</nom>
            <prenom>Douglas</prenom>
            <adresse>
                <numero>21</numero>
                <voie>Baker Street</voie>
                <codepostal>W1U 8ED</codepostal>
                <ville>Londre</ville>
                <pays>Angleterre</pays>
            </adresse>
        </identite>
        <!-- liste des comptes bancaires du client -->
        <comptes>
            <compteinteret interets="1.5" nom="Livret A">
                <montant>2500</montant>
            </compteinteret>
            <compte>
                <montant>4200</montant>
            </compte>
        </comptes>
    </client>
</banque>
```
**Faire le xsd "nature"**
```
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <xsd:element name="banque">
        <xsd:complexType>
            <xsd:sequence>
                <xsd:element name="client" minOccurs="0" maxOccurs="unbounded">
                    <xsd:complexType>
                        <xsd:sequence>
                            <xsd:element name="identite">
                                <xsd:complexType>
                                    <xsd:all>
                                        <xsd:element name="nom" minOccurs="1" type="xsd:string" />
                                        <xsd:element name="prenom" maxOccurs="4" type="xsd:string" />                                      
                                        <xsd:element name="adresse">
                                            <xsd:complexType>
                                                <xsd:sequence>
                                                    <xsd:element name="numero" type="xsd:string" />
                                                    <xsd:element name="voie" type="xsd:string" />
                                                    <xsd:element name="codepostal" type="xsd:string" />
                                                    <xsd:element name="ville" type="xsd:string" />
                                                    <xsd:element name="pays" type="xsd:string" />
                                                </xsd:sequence>
                                            </xsd:complexType>
                                        </xsd:element>
                                    </xsd:all>
                                </xsd:complexType>
                            </xsd:element>
                            <xsd:element name="comptes">
                                <xsd:complexType>
                                    <xsd:all>
                                        <xsd:element name="compteinterets" minOccurs="0" maxOccurs="unbounded">
                                            <xsd:complexType>
                                                <xsd:sequence>
                                                    <xsd:element name="montant" type="xsd:double" />
                                                </xsd:sequence>
                                                <xsd:attribute name="interets" type="xsd:float" />
                                                <xsd:attribute name="nom" type="xsd:string" />
                                            </xsd:complexType>
                                        </xsd:element>
                                        <xsd:element name="compte">
                                            <xsd:complexType>
                                                <xsd:sequence>
                                                    <xsd:element name="montant" type="xsd:double" />
                                                </xsd:sequence>
                                            </xsd:complexType>
                                        </xsd:element>
                                    </xsd:all>
                                </xsd:complexType>
                            </xsd:element>
                        </xsd:sequence>
                    </xsd:complexType>
                </xsd:element>
            </xsd:sequence>
        </xsd:complexType>
    </xsd:element>
</xsd:schema>
```
les xsd deviennent très difficiles à lire (et à écrire !), on peut les découper en morceaux réutilisables pour les appliquer et rendre les xsd plus lisibles on utilisera le mot-clef ref

En xsd :
On déclare tous les éléments simples qui seront intégré plus tard dans les éléments complexes
```
<xsd:element name="numero" type="xsd:string" />
<xsd:element name="voie" type="xsd:string" />
<xsd:element name="codepostal" type="xsd:string" />
<xsd:element name="ville" type="xsd:string" />
<xsd:element name="pays" type="xsd:string" />
<xsd:element name="montant" type="xsd:double" />
```
On peut créer des groupe d'élément

Créer le groupe d'élément de l'adresse
```
<xsd:group name="grp-adresse">
    <xsd:sequence>
        <xsd:element ref="numero" />
        <xsd:element ref="voie" />
        <xsd:element ref="codepostal" />
        <xsd:element ref="ville" />
        <xsd:element ref="pays" />
    </xsd:sequence>
</xsd:group>
```
Créer l'élément adresse
```
<xsd:element name="adresse">
    <xsd:complexType>
        <xsd:group ref="grp-adresse" />
    </xsd:complexType>
</xsd:element>
```
Créer le groupe des éléments contenus dans identite
```
<xsd:group name="grp-identite">
    <xsd:sequence>
        <xsd:element ref="nom" />
        <xsd:element ref="prenom" />
        <xsd:element ref="adresse" />
    </xsd:sequence>
</xsd:group>
```
Créer l'élément identité
```
<xsd:element name="identite">
    <xsd:complexType>
        <xsd:group ref="grp-identite" />
    </xsd:complexType>
</xsd:element>
```
on peut créer ses propres types car ici, livret A et compte courant ont le même format 
on déclare donc ses propre types
#### Déclaration d'un type simple
```
<xsd:simpleType name="mon_type_perso">
    <xsd:restriction>
        ....
    </xsd:restriction>
</xsd:simpleType>
<xsd:element name="mon_element" type="mon_type_perso" />
```
#### Déclaration de type complexe
```
<xsd:complexType name="mon_type_complexe">
    ....
</xsd:complexType>

<xsd:element name="mon_element_type_complexe" type="mon_type_complexe" />
```
Déclarer un type compte courant
```
<xsd:complexType name="comptecourant">
    <xsd:sequence>
        <xsd:element ref="montant" />
    </xsd:sequence>
</xsd:complexType>
```
Création du type comptesinterets
```
<xsd:complexType name="comptesinterets">
    <xsd:complexType>
        <xsd:extension base="comptecourant">
            <xsd:attribute name="interets" type="xsd:float" />
            <xsd:attribute name="nom" type="xsd:string" />
        </xsd:extension>
    </xsd:complexType>
</xsd:complexType>
```
Création parties comptes
```
<xsd:element names="comptes">
    <xsd:complextype>
        <xsd:all>
            <xsd:element name="compte" type="comptecourant" minOccurs="1" />
            <xsd:element name="compteinteret" type="comptesinterets" 
                minOccurs="0" 
                maxOccurs="unbouded" 
                />
        </xsd:all>
    </xsd:complextype>
</xsd:element>
```
Création de la partie client
```
<xsd:element name="client">
    <xsd:complexType>
        <xsd:sequence>
            <xsd:element ref="identite" />
            <xsd:element ref="comptes" />
        </xsd:sequence>
    </xsd:complexType>
</xsd:element>
```
Schema final xsd
```
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <!-- c'est dans cette partie qu'on écrit les éléments créés précédemment -->
    <xsd:element name="banque">
        <xsd:complexType>
            <xsd:sequence>
                <xsd:element ref="client" minOccurs="0" maxOccurs="unbounded" />
            </xsd:sequence>
        </xsd:complexType>
    </xsd:element>
</xsd:schema>
```
### Créer ses propres types (comme comptecourant et comptesinterets ) 
Deux façons de créer ses propres types : 
- par restriction
- par Extension (comptecourant et comptesinterets)

#### héritage par restriction
Pour un élément
```
<xsd:element name="nom_element">
    <xsd:simpleType>
        <xsd:restriction base="type_de_base" />
        <!-- type_de_base : le type de la valeur pour la restriction utilisée dans l'héritage -->
    </xsd:simpleType>
</xsd:element>
```
Pour un attribut
```
<xsd:attribut name="nom_attribut">
    <xsd:simpleType>
        <xsd:restriction base="type_de_base" />
        <!-- type_de_base : le type de la valeur pour la restriction utilisée dans l'héritage -->
    </xsd:simpleType>
</xsd:attribut>
```
exemple :  La balise personne possède un attribut age.
- la valeur de cet attribut doit être entière et positive
- la valeur de cet attribut doit être strictement supérieur à 17
- la valeur de cet attribut doit être strictement inférieur à 80

En xml : 
```
<personne age="17" /><!-- invalide -->
<personne age="25" /><!-- valide -->
<personne age="43" /><!-- valide -->
<personne age="80" /><!-- invalide -->
```
Le xsd
```
<xsd:element name="personne">
    <xsd:complexType>
        <!-- crée l'attribut -->
        <xsd:attribute name="age">
            <xsd:simpleType>
                <!-- c'est ici qu'on décrit la ou les restriction -->
                <xsd:restriction base="nonNegativeInteger">
                    <xsd:minExclusive value="17" />
                    <xsd:maxExclusive value="80" />
                </xsd:restriction>
            </xsd:simpleType>
        </xsd:attribute>
    </xsd:complexType>
</xsd:element>
```
Les restrictions s'appliquent de la même manière pour :  
|Restriction     |Fonction                                                              |
|----------------|----------------------------------------------------------------------|
|minExclusive    |permet de définir une valeur minimale exclusive                       |
|minInclusive    |permet de définir une valeur minimale inclusive                       |
|maxExclusive    |permet de définir une valeur maximale exclusive                       |
|maxInclusive    |permet de définir une valeur maximale inclusive                       |
|totalDigits     |permet de définir le nombre exact de chiffres quicomposent un nombre  |
|fractionDigits  |permet de définir le nombre de chiffres autorisésaprès la virgule     |
|length          |permet de définir le nombre exact de caractèresd'une chaîne           |
|minLength       |permet de définir le nombre minimum de caractèresd'une chaîne         |
|maxLength       |permet de définir le nombre maximum de caractèresd'une chaîne         |

**Enumeration**
liste des valeurs possibles pour un élément (balise ou un attribut)
```
<!-- valide : physique est dans la liste des valeurs autorisées -->
<personne raisonsociale="physique">
    <nom>Duflot</nom>
</personne>
<!-- valide : morale est dans la liste des valeurs autorisées -->
<personne raisonsociale="morale">
    <nom>Nestlé</nom>
</personne>
<!-- invalide : truc n'est pas dans la liste des valeurs autorisées -->
<personne raisonsociale="truc">
    <nom>Bob</nom>
</personne>
```
Le xsd
```
<xsd:element name="personne">
    <xsd:comlpexType>
        <xsd:element name="nom" type="xsd:string" />
        <!-- création de l'attribut -->
        <xsd:attribute name="raisonsociale">
            <xsd:simpleType>
                <xsd:restriction base="xsd:string">
                    <xsd:enumeration value="physique" />
                    <xsd:enumeration value="morale" />
                </xsd:restriction>
            </xsd:simpleType>
        </xsd:attribute>
    </xsd:comlpexType>
</xsd:element>
```
**whitespace**
permet de transformer et gérer les espaces (tabulation, retour à la ligne, espaces simples) dans une balise ou un attribut

|Valeur      |Fonction                                                                                                                          |
|------------|----------------------------------------------------------------------------------------------------------------------------------|
|preserve    |garde les espaces dans la donnée                                                                                                  |
|Replace     |remplace tous les espaces par des espaces simples (si espace, tab et retour chariot sont présent, remplacés par trois espaces)    |
|Collapse    |remplace tous les espaces par un seul espace simple (si espace, tab et retour chariot sont présent, remplacés par un seul espace) |

```
<nom>Gérard     
    Manfroi 
</nom>
```
En xsd
```
<xsd:element name="nom">
    <xsd:simpleType>
        <xsd:restriction base="xsd:string">
            <xsd:whiteSpace value="collapse" />
        </xsd:restriction>
    </xsd:simpleType>
</xsd:element>
```
la données sera traité comme si le xml était de cette forme
```
<nom>Gérard Manfroi </nom>
```
**pattern**
Détermine un motif de données auquel la valeur de la balise ou de l'attribut doit correspondre pour être valide 
```
<!-- valide -->
<email>nduflot@dawan.fr</email>
<!-- invalide -->
<email>ndudu@dawan</email>
```
En xsd
```
<xsd:element name="email">
    <xsd:restriction base="xsd:token">
        <xsd:maxLength value="254" />
        <xsd:pattern value='(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))' />
    </xsd:restriction>
</xsd:element>
```
#### Héritage par extension
```
<comptes>
    <compteinteret interets="1.5" nom="Livret A">
        <montant>2500</montant>
    </compteinteret>
    <compte>
        <montant>4200</montant>
    </compte>
</comptes>
```
Déclaration de l'élément montant
```
<xsd:element name="montant" type="xsd:double" />
```
Déclarer un type compte courant
```
<xsd:complexType name="comptecourant">
    <xsd:sequence>
        <xsd:element ref="montant" />
    </xsd:sequence>
</xsd:complexType>
```
Création du type comptesinterets
```
<xsd:complexType name="comptesinterets">
    <xsd:complexType>
        <xsd:extension base="comptecourant">
            <xsd:attribute name="interets" type="xsd:float" />
            <xsd:attribute name="nom" type="xsd:string" />
        </xsd:extension>
    </xsd:complexType>
</xsd:complexType>
```
Création parties comptes
```
<xsd:element names="comptes">
    <xsd:complextype>
        <xsd:all>
            <xsd:element name="compte" type="comptecourant" minOccurs="1" />
            <xsd:element name="compteinteret" type="comptesinterets" 
                minOccurs="0" 
                maxOccurs="unbouded" 
                />
        </xsd:all>
    </xsd:complextype>
</xsd:element>
```
#### Les identifiants Key et keyRef
Permet d'identifier et de référencer les ressources dans un schéma XML en étant plus précis qu'en utilisant
ID et IDREF
Cela utilise Xpath
**Key**
un élément composé d'un selector avec l'attribut xpath
xpath est le chemin dans l'arbre du xml pour référencer un ou plusieurs autres éléments field (champ)
qui possèdent au aussi une expression xpath qui indique l'attribut qui servira d'identifiant
```
<xsd:key name="nom_identifiant_de_la_clef">
    <xsd:selector xpath="expression xpath" />
    <!-- le ou les champs concernés par la clef -->
    <xsd:field xpath="expression xpath" />
</xsd:key>
```
Avec le xml suivant
```
<famille>
    <parent id="par-1" />
    <enfant id="par-2" parent="par-1" />
</famille>
```
L'élément famille possède deux éléments : parent et enfant.
Chacun possède un attribut unique nommé id.
L'enfant possède en plus un attribut parent référent l'id de son parent
**xsd sans utiliser de référence entre l'attribut id et l'attribut parent**
parent
```
<xsd:element name="parent">
    <xsd:complexType>
        <xsd:attribute name="id" type="xsd:NCName" />
    </xsd:complexType>
</xsd:element>
```
enfant
```
<xsd:element name="enfant">
    <xsd:complexType>
        <xsd:attribute name="id" type="xsd:NCName" />
        <xsd:attribute name="parent" type="xsd:NCName" />
    </xsd:complexType>
</xsd:element>
```
famille
```
<xsd:element name="famille">
    <xsd:complexType>
        <xsd:all>
            <xsd:element ref="parent" minOccurs="0" maxOccurs="unbounded" />
            <xsd:element ref="enfant" minOccurs="0" maxOccurs="unbounded" />
        </xsd:all>
    </xsd:complexType>
</xsd:element>
```
faire le lien entre les éléments de famille avec key et key ref
créer une clef identifiant de l'élément parent
on nommera la clef parentId
```
<xsd:key name="parentId">
    <!-- localiser l'élément qui recevra cette clef -->
    <xsd:selector xpath="/child::parent" />
    <!-- il faut maintenant désigner dans l'élément quel est l'attribut qui sera la clef nommée parentId -->
    <xsd:field xpath="attribute::id" />
</xsd:key>
```
Créer une clef identifiant de l'élément enfant
On nommera la clef enfantId
```
<xsd:key name="enfantId">
    <!-- localiser l'élément qui recevra cette clef -->
    <xsd:selector xpath="/enfant" />
    <!-- il faut maintenant désigner dans l'élément quel est l'attribut qui sera la clef nommée enfantId -->
    <xsd:field xpath="@id" />
</xsd:key>
```
Faire le lien entre parentId et l'attribut parent d'un élément enfant

on déclare une référence de clef (keyref) entre la clef nommée parentId et l'attribut parent de l'élément enfant
```
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <xsd:keyref name="parentIdRef" refer="parentId">
        <!-- il faut maintenant désigner l'élément ciblé par cette référence de clef -->
        <xsd:selector xpath="/enfant" />
        <!-- le champ de l'élément référencé par la clef parentId -->
        <xsd:field xpath="@parent" />
    </xsd:keyref>
    <xsd:element ref="famille" />
</xsd:schema>
```