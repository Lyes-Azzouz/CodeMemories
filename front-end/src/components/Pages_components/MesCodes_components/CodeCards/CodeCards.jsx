// Style
import "./codecards.scss";
// Components
import { ButtonsCard } from "../ButtonsCard/ButtonsCard";

// Affiche les cards pour chaque sauvegarde de code dans l'application
// Projette les données de la constante data dans Container.jsx
export function CodeCards(props) {
  const test =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas beatae aliquam libero fugit amet recusandae magni debitis explicabo. Molestiae nobis impedit ea qui iste itaque vitae exercitationem repellat assumenda deserunt error sapiente numquam dolores quos eius quasi illo harum fuga, reiciendis optio expedita aliquid corrupti temporibus laboriosam! Nulla sit tempora vel rerum harum repellendus quo veritatis consequuntur soluta magni deserunt, a maiores in consectetur, cumque reiciendis earum, id necessitatibus aperiam laudantium blanditiis? Cupiditate dolores in voluptatum minus ipsam sit et aperiam unde? Enim laboriosam autem quae quisquam ipsam doloremque, ea itaque cupiditate vero ad quia maxime explicabo facilis nesciunt recusandae expedita ex fugiat temporibus quidem pariatur reprehenderit inventore dicta accusantium consectetur. Minus, magni. Nam vel quaerat maxime dolore hic at fugiat vero fuga ratione. Inventore, vel! Laborum temporibus placeat, sed quisquam praesentium pariatur perferendis nesciunt nisi aspernatur animi! Repellendus aperiam dignissimos, ipsa placeat distinctio est at voluptatum maxime, quam esse voluptatibus doloremque veniam neque laborum atque quia ex eaque libero ut tenetur? Aliquid nobis debitis iste voluptas deleniti dolore, molestias reiciendis illum nam, quia, veniam repellendus eaque. Soluta deserunt quis voluptatum consequatur ab, fuga, quidem cumque labore quod atque eaque molestias, omnis a quibusdam nisi ipsam. Sed mollitia aliquam eaque aspernatur laudantium quo commodi veniam? Ad vel sapiente iusto quos quidem, quam natus cupiditate animi nostrum voluptate impedit suscipit excepturi explicabo repellendus earum et deserunt ex eum aperiam dolorem, magni amet mollitia. Iure dignissimos recusandae molestiae fugit alias delectus sequi atque soluta consequatur, sit suscipit eum! Repudiandae eveniet qui itaque quas laborum aliquam fugiat eos facilis harum reprehenderit nam ab ad magni hic repellendus earum, sapiente expedita molestias fuga corporis. Laudantium, aut culpa. Inventore nemo eveniet molestiae, dicta impedit suscipit, ut officia alias sint necessitatibus incidunt doloremque esse aperiam odio. Iste aperiam in eaque, officiis consequuntur veniam nostrum laboriosam aliquid nisi asperiores maiores aliquam aut, tempore dicta mollitia fuga, dolorum laborum et quae! Ea commodi voluptatum maiores provident harum dolores id consequatur consequuntur praesentium at quaerat nemo, quibusdam laboriosam, exercitationem fugit aperiam facere voluptate officia? Reprehenderit, neque enim. Reiciendis cupiditate culpa, cum quod facere, earum non harum cumque laborum porro, natus repudiandae molestias? Ducimus magnam expedita corporis animi minima sint officiis deleniti perspiciatis rem modi distinctio quae vitae exercitationem velit vero doloribus assumenda, blanditiis, dignissimos saepe voluptatibus aut eaque voluptatem deserunt! Aliquid sit eligendi beatae id itaque a laudantium dicta eum corrupti ipsum consequuntur expedita ipsam iusto, incidunt doloribus earum similique? Ipsa, voluptatibus. Exercitationem aspernatur esse at pariatur numquam cumque facere itaque, laboriosam beatae aliquam dolorem fugiat officiis sunt corporis laborum reprehenderit tempore! Animi deserunt sapiente obcaecati atque, officiis tempore a laborum est autem expedita dolor sint ratione doloribus, vero impedit molestiae suscipit maxime aspernatur consequuntur tenetur quos veniam, harum nam facere? Sed tempore consequuntur consequatur totam numquam facilis, sapiente accusamus! Animi illo porro suscipit numquam sed, commodi officia veniam repudiandae, quibusdam repellat temporibus neque nihil, nesciunt adipisci ullam cum esse. Esse non facilis eum suscipit quis repellendus, possimus iste odio animi libero laboriosam alias error fuga nesciunt quam eligendi a sed sint consectetur iusto ipsa! Modi aliquam asperiores, iste eligendi, saepe in qui ad voluptatem sequi iure sint laborum pariatur optio aperiam corporis voluptates earum eius maiores commodi deserunt molestias tenetur. Deleniti alias inventore, impedit aliquam, cumque, nesciunt fugiat magni dolor sapiente ducimus delectus praesentium sunt error. Accusamus optio voluptatum saepe molestias aliquam culpa sequi in consequatur reprehenderit consectetur, doloribus velit voluptate? Harum dolorum, architecto quia iste consectetur a? Inventore ea quo veniam numquam! Minima, labore quaerat at possimus velit facilis mollitia ipsum veniam, numquam nulla eligendi voluptatum officia atque quia facere necessitatibus? Aliquam debitis quisquam reprehenderit ullam quod.";

  return (
    <div className="cards_container">
      {props.data.map((card, index) => {
        return (
          <div className="card" key={index}>
            <div className="top-content">
              <div className="texts">
                <h3>{card.title} </h3>
                <p>{card.description} </p>
              </div>

              <div className="buttons">
                <ButtonsCard />
              </div>
            </div>
            <div className="bottom-content">
              <p className="code-content">{test} </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
