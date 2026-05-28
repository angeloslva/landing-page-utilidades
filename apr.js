async function validarESalvar() {
    const obrigatorios = ["tarefa", "local", "respArea", "solicitArea", "aprovArea", "brigadArea", "execArea1", "execArea_2", "execArea3", "execArea4"];
    for (let id of obrigatorios) {
        if (!document.getElementById(id).value.trim()) {
            alert("Preencha todos os campos obrigatórios.");
            document.getElementById(id).focus();
            return;
        }
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");

    let y = 15;
    doc.setFontSize(14);
    doc.text("APR - Análise Preliminar de Risco", 105, y, { align: "center" });
    y += 10;

    doc.setFontSize(10);
    doc.text(`Tarefa: ${tarefa.value}`, 10, y); y += 6;
    doc.text(`Local: ${local.value}`, 10, y); y += 6;
    doc.text(`Data: ${data.value}`, 10, y); y += 8;

    doc.text("PASSO A PASSO:", 10, y); y += 5;
    doc.text(passos.value, 10, y); y += 20;

    doc.text("RISCOS:", 10, y); y += 5;
    doc.text(riscos.value, 10, y); y += 20;

    doc.text("MEDIDAS DE MITIGAÇÃO:", 10, y); y += 5;
    doc.text(medidas.value, 10, y); y += 15;

    doc.text(`Responsável pela Área: ${respArea.value}`, 10, y); y += 6;
    doc.text(`Solicitante: ${solicArea.value}`, 10, y); y += 6;
    doc.text(`Aprovador: ${aprovArea.value}`, 10, y); y += 6;
    doc.text(`Brigadista: ${brigadArea.value}`, 10, y); y += 6;
    doc.text(`Executante 1: ${execArea_1.value}`, 10, y);
    doc.text(`Executante 2: ${execArea_2.value}`, 10, y);
    doc.text(`Executante 3: ${execArea_3.value}`, 10, y);
    doc.text(`Executante 4: ${execArea_4.value}`, 10, y);

    doc.save("APR_Montagem_Valvulas.pdf");
}