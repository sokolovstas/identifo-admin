const createAppleService = ({ httpClient }) => {
  const uploadDevDomainAssociationFile = (file) => {
    const data = new FormData();
    const url = `${process.env.API_URL}/static/uploads/apple-domain-association`;

    data.append('file', file);

    return httpClient.post(url, data);
  };

  const uploadAppSiteAssociationFileContents = (fileContent) => {
    const url = `${process.env.API_URL}/static/template?name=apple-app-site-association`;
    const body = {
      contents: fileContent,
    };

    return httpClient.post(url, body);
  };

  return {
    uploadAppSiteAssociationFileContents,
    uploadDevDomainAssociationFile,
  };
};

export default createAppleService;
