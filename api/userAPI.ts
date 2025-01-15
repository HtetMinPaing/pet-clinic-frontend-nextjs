export const fetchOwners = async ({
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
    `http://localhost:8080/api/owner/all/pages?size=${size || 20}&page=${
      page || 0
    }${search && "&search=" + search}${city && "&city=" + city}${
      township && "&township=" + township
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

export const addUser = async (userData) => {
  const response = await fetch("http://localhost:8080/api/owner/register", {
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

export const updateUser = async (id, updateData) => {
  const response = await fetch(`http://localhost:8080/api/owner/update/${id}`, {
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

export const deleteUser = async (id) => {
  const response = await fetch(`http://localhost:8080/api/owner/delete/${id}`, {
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

export const deleteSelectedUser = async (ids) => {
  const response = await fetch(`http://localhost:8080/api/owner/delete`, {
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

export const findPawrentByEmail = async (email: string) => {
  const response = await fetch(
    `http://localhost:8080/api/owner/all/pages?email=${email}`,
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

  return data.content;
};
