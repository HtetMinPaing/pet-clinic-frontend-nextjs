const apiroute = "http://localhost:8080/api/vet";

export const fetchDoctors = async ({
  type,
  size,
  page,
  search,
  city,
  township,
}: {
  type: string;
  size: number;
  page: string;
  search: string;
  city: string;
  township: string;
}) => {
  const response = await fetch(
    `${apiroute}/all/pages?size=${size || 20}&page=${page || 0}${
      search && "&search=" + search
    }${city && "&city=" + city}${township && "&township=" + township}`,
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
    fullName: item.fullName || "N/A",
    email: item.email || "N/A",
    contactPhone: item.contactPhone || "N/A",
    address: item.address || "N/A",
    township: item.township || "N/A",
    city: item.city || "N/A",
  }));

  return {
    content: formattedRows,
    totalElements: data.totalElements,
  };
};

export const addDoctor = async (userData) => {
  const response = await fetch(`${apiroute}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }

  const data = await response.json();
  console.log(data);
};

export const updateDoctor = async (id, updateData) => {
  const response = await fetch(`${apiroute}/update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }

  const data = await response.json();
  console.log(data);
};

export const deleteDoctor = async (id) => {
  const response = await fetch(`${apiroute}/delete/${id}`, {
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

export const deleteSelectedDoctors = async (ids) => {
  const response = await fetch(`${apiroute}/delete/selected`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ids),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }
};

export const findDoctorsByEmail = async (email: string) => {
  const response = await fetch(`${apiroute}/all/pages?email=${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }

  const data = await response.json();
  console.log(data);

  return data.content;
};
