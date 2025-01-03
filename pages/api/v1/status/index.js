function status(request, response) {
  return response.status(200).json({nome:"Teste"});
}

export default status;
