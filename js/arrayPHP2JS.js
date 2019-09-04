/* Date de cr�ation: 24/03/2005 */
/**
* Fonctions de s�rialisation de tableaux PHP vers des tableaux JavaScript
* On r�cup�re des valeurs de PHP pour les retourner en JavaScript.
*/
function PhpArray2Js(tabphp_serialise)
{
    this.php = corrigerChainePHP(tabphp_serialise);
    var dim = this.extraireDimTab();
    this.tabjs = this.transformer(dim);
}

PhpArray2Js.prototype.retour = function()
{
    // retourne le tableau JS
    return this.tabjs;
}

PhpArray2Js.prototype.transformer = function(dim)
{
    // m�thode principale qui transforme la cha�ne s�rialis�e en un tableau Javascript
    // dim est la dimension du tableau PHP
    var tab = new Array();
    // extrait un groupe de dim donn�es (indice - valeur)
    for (var i=0;i<dim;i++)
    {
        // extrait un indice : num�rique ou litt�ral
        var indice = this.extraireIndice();
        if (indice == -1)
        {
            return;
        }
        // extrait une valeur : tableau, null, bool�en, num�rique ou litt�ral
        var valeur = this.extraireValeur();
        if (valeur == -1)
        {
            tab[indice] = undefined;
        }
        else
        {
            switch (valeur[0])
            {
                case "N" : tab[indice] = null;                          break;
                case "b" : tab[indice] = valeur[1] ? true : false;      break;
                case "i" : tab[indice] = parseInt(valeur[1]);           break;
                case "d" : tab[indice] = parseFloat(valeur[1]);         break;
                case "s" : tab[indice] = valeur[1];                     break;
                case "a" : tab[indice] = this.transformer(valeur[1]);   break;
                default  : tab[indice] = undefined;
            }
        }
    }
    // en fin de groupe de donn�es, supprime le "}" final
    this.php = this.php.substring(1);
    return tab;
}

PhpArray2Js.prototype.extraireDimTab = function()
{
    // extrait la dimension N du tableau de "a:N:{"
    var reg = this.php.match(/^a:(\d+):\{/);
    if (reg != -1)
    {
        // on coupe le texte de l'entit� d�tect�e
        this.php = this.php.substring(reg[0].length);
        return reg[1];
    }
    else
    {
        return -1;
    }
}

PhpArray2Js.prototype.extraireIndice = function()
{
    // extrait l'indice d'un tableau
    // cet indice peut �tre de la forme "i:\d+" ou "s:\d+:\"\w+\""
    var retour;
    var reg = this.php.match(/^((i):(\d+);|(s):\d+:"([^"]+)";)/);
    if (reg != -1)
    {
        // on coupe le texte de la cha�ne d�tect�e
        this.php = this.php.substring(reg[0].length);
        if (reg[2] == "i") retour = reg[3];
        else if (reg[4] == "s") retour = reg[5];
        else retour = -1;
    }
    else retour = -1;
    return retour;
}

PhpArray2Js.prototype.extraireValeur = function()
{
    // extrait une valeur au d�but de this.php
    // cette valeur est de type "a:\d+:{" ou "N" ou "b:[01]" ou "i:\d+" ou "i:[\d\.]+" ou "s:\d+:\"\w+\""
    // on tente de d�tecter une valeur en t�te de texte
    var retour;
    var reg = this.php.match(/^((N);|(b):([01]);|(i):(\d+);|(d):([\d\.]+);|(s):\d+:"([^"]*)";|(a):(\d+):\{)/);
    if (reg != -1)
    {
        // on coupe le texte de la valeur d�tect�e
        this.php = this.php.substring(reg[0].length);
        // retour est un tableau contenant le type et la valeur de la donn�e d�tect�e dans la cha�ne
        if (reg[2] == "N") retour = new Array("N", null); // valeur nulle
        else if (reg[3] == "b") retour = new Array("b", reg[4]); // bool�en (true/false)
        else if (reg[5] == "i")  retour = new Array("i", reg[6]); // entier
        else if (reg[7] == "d")  retour = new Array("d", reg[8]); // entier double ou flottant
        else if (reg[9] == "s") retour = new Array("s", remplacerQuotes(reg[10])); // cha�ne de caract�res
        else if (reg[11] == "a") retour = new Array("a", reg[12]); // sous-tableau
        else retour = -1;
    }
    else retour = -1;
    return retour;
}

function corrigerChainePHP(chaine)
{
    // remplace les &quot; en " uniquement autour des cha�nes de caract�res
    chaine = chaine.replace(/:&quot;/g, ':"');
    chaine = chaine.replace(/&quot;;/g, '";');
    return chaine;
}

function remplacerQuotes(chaine)
{
    // remplace les &quot; � l'int�rieur des cha�nes de caract�res
    return chaine.replace(/&quot;/g, '\"');
}
PhpArray2Js.prototype.var_dump = function() {
    // affiche le tableau
    return var_dump(this.tabjs);
}

function var_dump(tab)
{
    // fonction analogue � var_dump en PHP, mais plus simple
    var indent = (arguments.length == 2) ? arguments[1] + "\t" : "\t";
    var i = 0;
    var elements = "";
    for (var elt in tab)
    {
        elements += (i ? ",\n " : " ") + indent + "[" + elt + "]:";
        switch (typeof tab[elt])
        {
            case "string" :
            elements += "\"" + tab[elt] + "\""; break;
            case "number" :
            elements += tab[elt]; break;
            case "object" :
            if (tab[elt] == null) elements += "*null*";
            else if (tab[elt]) elements += var_dump(tab[elt], indent); break;
            case "undefined" :
            elements += "*undefined*"; break;
            default : elements += tab[elt];
        }
        i++;
    }
    return "tableau(" + i + "){\n" + elements + "\n" + (arguments[1] ? arguments[1] : "") + "}";
}