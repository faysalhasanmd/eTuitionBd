import Card from "./Card";
import Container from "../Shared/Container";

const Tuition = ({ tuitions }) => {
  console.log(tuitions);
  return (
    <Container>
      <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">
        {tuitions && tuitions.length > 0 ? (
          tuitions.map((tuition) => <Card key={tuition._id} item={tuition} />)
        ) : (
          <p className="col-span-full text-center font-semibold py-10">
            No approved tuitions found.
          </p>
        )}
      </div>
    </Container>
  );
};

export default Tuition;
