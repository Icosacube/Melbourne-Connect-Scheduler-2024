import "./header.css"

/* This is a default component meant to show yall how it works*/
export default function Header() {
  return (
    <div class="topnav">
      <a class="active" href="#home">
        Home
      </a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </div>
  );
}
