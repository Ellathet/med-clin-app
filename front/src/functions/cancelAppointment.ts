import { api } from "../services/api";

export default function cancelAppointment(id) {

    api.put('/appointment', {
        id: id
    })

}