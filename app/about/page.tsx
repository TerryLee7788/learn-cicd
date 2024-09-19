function AboutPage() {
  return (
    <section>
      this is about page
      <p>API_URL: {process.env.API_URL}</p>
      <p>NEXT_PUBLIC_API_URL: {process.env.NEXT_PUBLIC_API_URL}</p>
    </section>
  );
}

export default AboutPage;
