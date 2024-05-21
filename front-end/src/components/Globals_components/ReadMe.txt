Le dossier "Globals Components" contient les des composants qui s'afficheront sur l'application, peu importe la page sur laquelle nous nous trouvons.

Les deux composants (Navbar, SideBar) sont les composants principaux de l'application, c'est pourquoi ils sont dans un dossier "Globals_Components" afin de les stocker à part des autres composants parents.

Ils sont utilisés directement dans App.jsx, et apparaîtront peu importe où l'on navigue, ce qui en fait des composants prioritaires même par rapport aux Pages.

Les pages s'afficheront en dessous du composant Navbar et à côté du composant SideBar sans jamais modifier ces composants. 

Cela me permet de ne pas oublier que les composants "Navbar et SideBar" sont des composants statiques, qui ne changeront jamais d'aspect, et qui doivent être présents sur toute l'application peu importe le contenu ou la page.

Ils se trouvent dans : "front-end\src\components\Globals_Components"

Pour le reste des components , ce sont des components qui seront utilisés dans d'autre pages , le components "Modal" sera utilisé dans les autres pages ainsi que les buttons et la filterbar.