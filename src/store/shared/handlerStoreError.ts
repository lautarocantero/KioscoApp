
const handleError = (error: unknown) => {

    if(!(error instanceof Error)) throw new Error('Something went wrong while login, retry please.');

    throw new Error(error.message);
      
}

export default handleError;



