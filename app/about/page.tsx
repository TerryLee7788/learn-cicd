function AboutPage() {
  const API_URL = process.env.API_URL;
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log(API_URL);
  console.log(NEXT_PUBLIC_API_URL);
  return (
    <section>
      this is about page
      <p>API_URL: {process.env.API_URL}</p>
      <p>NEXT_PUBLIC_API_URL: {process.env.NEXT_PUBLIC_API_URL}</p>
    </section>
  );
}

export default AboutPage;
