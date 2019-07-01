import styles from "./styles.scss";

export class BookComponent extends HTMLElement {
  public static readonly selector = "lib-book";

  private image!: HTMLImageElement;
  private intersectionObserver!: IntersectionObserver;

  private get author(): string {
    return this.book.author_name ? this.book.author_name[0] : "Unknown";
  }

  constructor(private book: Book) {
    super();

    this.handleIntersection = this.handleIntersection.bind(this);
    this.intersectionObserver = new IntersectionObserver(this.handleIntersection);
  }

  connectedCallback() {
    this.image = new Image();
    this.image.sizes = "30vw";
    this.image.width = 200;
    this.image.alt = this.book.title;
    const coverContainer = document.createElement("div");
    coverContainer.appendChild(this.image);

    console.log(this.book, this);
    const details = document.createElement("div");
    details.innerHTML = `
      <div class="${styles.details}">
        <h3 class="${styles.title}" title=${this.book.title}>${this.book.title}</h3>
        <p class="${styles.author}">By: <b>${this.author}</b></p>
      </div>
    `;

    this.append(coverContainer, details);

    this.intersectionObserver.observe(this);
  }


  private handleIntersection([first]: IntersectionObserverEntry[]) {
    if (first.intersectionRatio > 0) {
      let coverUrl = 
        this.book.cover_i?`id/${this.book.cover_i}`:(!!this.book.isbn?(`isbn/${this.book.isbn[0]}`):''
      );

      this.image.srcset = `
      http://covers.openlibrary.org/b/${coverUrl}-M.jpg?default=false 200w,
      http://covers.openlibrary.org/b/${coverUrl}-L.jpg?default=false 400w
    `;

    if (!coverUrl){
      this.image.srcset = '' 
    }

      this.intersectionObserver.disconnect();
    }
  }
}
