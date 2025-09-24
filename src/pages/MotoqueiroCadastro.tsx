import { useForm } from "react-hook-form";

interface GalpaoForm {
    nome: string;
    endereco: string;
    capacidade: number;
}

export function MotoqueiroCadastro() {

    const {control, reset, handleSubmit} = useForm<GalpaoForm>({
        defaultValues: {
            nome: "",
            endereco: "",
            capacidade: 0,
        }
    })

    const onSubmit = async(data: GalpaoForm) => {
        try {
            const response = await fetch("http://localhost:8080/galpoes/save", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            })
        }catch (error) {
      console.log("Erro na requisição: ", error)
    }
    }

    return (
        <div>

        </div>
    )
}