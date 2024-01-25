import { Chip } from "@nextui-org/react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <Chip color="danger" variant="shadow">
          {error.statusText || error.message}
        </Chip>
      </p>
    </div>
  );
}

export default ErrorPage;
