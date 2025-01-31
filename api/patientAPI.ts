export const fetchPatients = async ({
  type,
  size,
  page,
  search,
  status,
  breed,
}: {
  type: string;
  size: number;
  page: string;
  search: string;
  status: string;
  breed: string;
}) => {
  console.log(
    `http://localhost:8080/api/patient/all/pages?size=${size || 20}&page=${
      page || 0
    }${search && "&search=" + search}${status && "&status=" + status}${
      breed && "&breed=" + breed
    }`
  );

  const response = await fetch(
    `http://localhost:8080/api/patient/all/pages?size=${size || 20}&page=${
      page || 0
    }${search && "&search=" + search}${status && "&status=" + status}${
      breed && "&breed=" + breed
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }

  const data = await response.json();
  console.log(data);

  const formattedRows = data.content.map((item: any) => ({
    id: item.id,
    petName: item.petName,
    status: item.status,
    breed: item.breed,
    gender: item.gender,
    dateOfBirth: item.dateOfBirth,
    pawrentName: item.pawrent?.fullName || "N/A",
    pawrentEmail: item.pawrent?.email || "N/A",
    pawrentPhone: item.pawrent?.contactPhone || "N/A",
    pawrentAddress: `${item.pawrent?.address || "N/A"}, ${
      item.pawrent?.city || ""
    }, ${item.pawrent?.township || ""}`,
  }));

  return {
    content: formattedRows,
    totalElements: data.totalElements,
  };
};

export const addPatient = async (patientData) => {
  const pawrentEmail = patientData.pawrentEmail;
  const payload = {
    ...patientData,
    pawrent: {
      email: pawrentEmail,
    },
  };
  const response = await fetch("http://localhost:8080/api/patient/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }

  const data = await response.json();
  console.log(data);
};

export const updatePatient = async (id, updateData) => {
  const pawrentEmail = updateData.pawrentEmail;
  const payload = {
    ...updateData,
    pawrent: {
      email: pawrentEmail,
    },
  };
  const response = await fetch(`http://localhost:8080/api/patient/update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }

  const data = await response.json();
  console.log(data);
};

export const deletePatient = async (id) => {
  const response = await fetch(`http://localhost:8080/api/patient/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }
};

export const deleteSelectedPatient = async (ids) => {
  const response = await fetch(`http://localhost:8080/api/patient/delete/selected`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ids)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }
};