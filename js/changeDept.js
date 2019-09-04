/* On cr�e la fonction qui va construire la seconde liste d�roulante */
function changeDept(tab,idr)
{
    if(idr != "vide")
    {
    /* On compte les d�partements de cette r�gion */
    var nbd = tab[idr][1].length;
    var form_d  = '<select name="department" id="department">';
    for(var j = 0;  j < nbd; j++)
    {
        form_d += '  <option value="'+ tab[idr][1][j] +'">'+ tab[idr][2][j] +" ("+ tab[idr][1][j] +')<\/option>';
    }
    form_d += '<\/select>';
    }
    else
    {
        form_d = "";
    }
    document.getElementById("blocDepartements").innerHTML = form_d;
}
