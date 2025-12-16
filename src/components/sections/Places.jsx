// src/components/sections/Places.jsx
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navigation from "../Navigation.jsx";
import Footer from "./Footer.jsx";

/* ====== DATA ====== */
const places = [
  {
    title: "Mount Fuji",
    location: "Shizuoka & Yamanashi Prefecture",
    description:
      "Standing at 3,776 meters, Mount Fuji is Japan’s tallest and most iconic mountain. A UNESCO World Heritage site and a sacred symbol of Japan.",
    image: "/fuji.jpg",
    mapLink: "https://www.google.com/maps/place/Mount+Fuji/",
  },
  {
    title: "Kyoto Temples",
    location: "Kyoto",
    description:
      "Kyoto is the cultural heart of Japan with temples like Kinkaku-ji, Fushimi Inari Shrine, and traditional tea houses.",
    image: "/kyoto.jpg",
    mapLink: "https://www.google.com/maps/place/Kyoto/",
  },
  {
    title: "Tokyo Shibuya Crossing",
    location: "Tokyo",
    description:
      "The world’s busiest pedestrian crossing, showcasing Tokyo’s fast-paced modern lifestyle and neon cityscape.",
    image: "/shibuya.jpg",
    mapLink: "https://www.google.com/maps/place/Shibuya+Crossing/",
  },
  {
    title: "Hiroshima Peace Memorial",
    location: "Hiroshima",
    description:
      "A UNESCO World Heritage site symbolizing peace and remembrance of the atomic bombing.",
    image: "/hiroshima.jpg",
    mapLink: "https://www.google.com/maps/place/Hiroshima+Peace+Memorial/",
  },
  {
    title: "Nara Deer Park",
    location: "Nara",
    description:
      "A historic park famous for free-roaming sacred deer and the Great Buddha at Todai-ji Temple.",
    image: "/nara.jpg",
    mapLink: "https://www.google.com/maps/place/Nara+Park/",
  },
  {
    title: "Osaka Castle",
    location: "Osaka",
    description:
      "A majestic 16th-century castle surrounded by moats and cherry blossom gardens.",
    image: "/osaka.jpg",
    mapLink: "https://www.google.com/maps/place/Osaka+Castle/",
  },
  {
    title: "Hokkaido Snow Festival",
    location: "Sapporo, Hokkaido",
    description:
      "A winter festival featuring massive snow and ice sculptures held every February.",
    image: "/hokkaido.jpg",
    mapLink: "https://www.google.com/maps/place/Sapporo+Snow+Festival/",
  },
  {
    title: "Okinawa Beaches",
    location: "Okinawa",
    description:
      "Tropical islands with crystal-clear waters, coral reefs, and unique Ryukyu culture.",
    image: "/okinawa.jpg",
    mapLink: "https://www.google.com/maps/place/Okinawa/",
  },
  {
    title: "Nagoya Castle",
    location: "Nagoya, Aichi Prefecture",
    description:
      "A historic castle known for its golden shachihoko and samurai heritage.",
    image: "/nagoya.jpg",
    mapLink: "https://www.google.com/maps/place/Nagoya+Castle/",
  },
  {
    title: "Miyajima Floating Torii",
    location: "Itsukushima, Hiroshima",
    description:
      "Famous for its red floating torii gate that appears to rise from the sea during high tide.",
    image:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80",
    mapLink: "https://www.google.com/maps/place/Itsukushima+Shrine/",
  },
  {
    title: "Hakone Lake Ashi",
    location: "Hakone, Kanagawa",
    description:
      "A scenic lake with views of Mount Fuji, popular for pirate boat cruises and hot springs.",
    image:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80",
    mapLink: "https://www.google.com/maps/place/Lake+Ashi/",
  },
  {
    title: "Fushimi Inari Shrine",
    location: "Kyoto",
    description:
      "Renowned for its thousands of bright red torii gates forming scenic mountain trails.",
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    mapLink: "https://www.google.com/maps/place/Fushimi+Inari-taisha/",
  },
  {
    title: "Senso-ji Temple",
    location: "Asakusa, Tokyo",
    description:
      "Tokyo’s oldest Buddhist temple, famous for its Kaminarimon Gate and traditional streets.",
    image:
      "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=800&q=80",
    mapLink: "https://www.google.com/maps/place/Senso-ji/",
  },
  {
    title: "Kamakura Great Buddha",
    location: "Kamakura, Kanagawa",
    description:
      "A massive bronze Buddha statue dating back to the 13th century, symbol of serenity.",
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhIWFRUXFxgXGRgYGB0YGBcfGCAaGx8dHRofHSggIBolHxcbITEhJSorLi4uGSAzODMtNygtLisBCgoKDg0OGhAQGy8mICUtLS0tLS0tLS0vLS0tLTUtLy0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALgBEgMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAIDBAYBB//EAEMQAAIBAgQFAQYDBgQFAgcAAAECEQMhAAQSMQUiQVFhEwYycYGRoSNCsRRSYsHR8BUzguFDcpKy8RYkB1NzlKKjwv/EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAqEQACAgICAQMDAwUAAAAAAAAAAQIRAyESMSIEE0FRYXEykbEUQoHB4f/aAAwDAQACEQMRAD8ADgY7GO46Bj6A844BhwGOgY7GARwDDox0DHcAjgGOxi1w3LCpVRCYDGCREgd72xzM5bQTe0kDvA2PwOIcknQ1FtX8BjK+yNeolN10w4k39wHYnvPjbrgHXolGZTupKmNpBjGq4b7QaqQpkrSZVC6mBCQLD3dj8v1xHxDiORdakUgGNgUUqxiIYEiB1mRJ++OeOTIpNSX7GzxwcU0zOU8s5UsFJUEAkC0nYfGxt4xGqztfG94Dn1XL0tB1aRDXM/mJEdLntsBjN+0OYotXFTLix5iL3bUf1EWEYcM7lJxoUsXGKdgh6ZESCJEi242/UfbE/D869F9aGDBU+Q1jjR8IprmiSVp6l0qAQYSmoJMLMFpJN+2LNDh1FKjLSViygi5LBxAMsumPeHTt5gRP1MV4yRUcDe0x3Dszl/Ser6AEkBNXNqYG9gemrri1Vo1KutzTDEghb6QxAG7D3Tf+5MUqVJaCNK2AapcwGYMF0qLxYgifHxxYq8QUAAMANyhnUptBMHtuBNj8ccE0rbj0dsbpKXZMaitRqBGIRgqkEElSxJK6ZB1Lt1MqcM4HTC0gKKBmGoSTdgCdMkGwNtiRtviA8RVaZXlZSJJnUGVhBJG4EjTqIiQPBxZynEaNFCaKgEBgopksIQD8wBEXU2+8Ynk0qL42/uWTw2lSZqtQS1Uj3vdDE3UDuTtvYWxDlmGuowHKH2QAuAEAvcECdR23OJqmapZiC50FJGrUVjWDJGlheAwki1/nHVqrTcsmkCChE6g6n96TeL28nvh8myeNHa2fUWjVTIJvqUmRYzuDB3HbGey3EqRn0qjVCTaSoBWSOlyTqFwDtPjB6hl09IILmNKLOqIuAGJmYkxMb4oZr2dWwNBLkHUWAYNva0DaNybRG2AC3Syxc6VJWnIJOkERuPhbz1FsDON0CjhcudNSOYMCUa/vRMgkHob9cEOH1hTBQFm1bFjqjYaQDc7bmTcdsd4nUDgMgk6AJBvbcG+426YAPPOIcDr6yUIVzuAAqHvBDE9OoxY4RmxTqH9pISpTM8wGltTQCvSALz4nGlWipqIKgBgliCQCVBHbpsPniXiHCMtWB9WkyoinSFB0hzu1zDRYT48YpSa6JcUyNc0jhtFdPUN0UOpJiZkSSCfI+uIqzFzygi2rU4kA9omSRPgYB5b2YpUBLs7HlbUoI0x2P1G+2NBSzCLyM2iSBcm5Jgb37YhlWZri/s/XqK7iohCUyzFX0MQu4CnlAkAAd8Aa2Ro0KRqVOao4K0lptJ1Kw5mkGVm0WJxrOO+0K5dGAipVcMnpmbhpFysFheNI3jGcpUfSSlmKro1UEhKMJppLBvAaZJIOoDveb4GJkycIo+iKubqFKoIMQGABuqEXliTJt1A7nD+OcWStRFFxoDFCCKZQJHvDnEkwTEN26WMec4vmKtNmy9A1EBEkIX0MZUaZszXiYMCNt8P9n+FrmCK+ZWpVLuVj1IBCgG5HMA14JKjlG+ACI+0YVXy9GoUomkaeqspqEmIgEXSe+w6AYp8J4lRp0gAxpVy7a64M6Ut/lwJDECJEHeTjQvxTL0EKZfJUXqVHYoSuthqJCqWIg2WdyBckjHV9nKZQeqAapcsy04KqxBsZF9PXoLDaSQAavF8iBGhDFpNIknyTNz5wsWMzwnS7KppaQxAmgswDabb4WGBCBh6LJAmL7nphRjsY948sI8W4cKRCKKhYDn1LAn+Eb6f4jvOBwwcoe0tdfdbS5XQXNxHciDJtGx32G+JeBV5SpTHpXKk+rpC6RK/aZO5tIxyrLOCfJdGzhCT8WAAME8vwh2UMuluXXp1AHTMWvJMg2A/2Hkdvr/ti9w7PenMpqkgjmKERPUXi+NMnNrxIhxT8ifOFaNam6UtEKhK1Lhj1IBM6T/XDOMZ+jWcGmnplQFIFgAOkRAMk/wBjFWlmWWp6gjVJO1pPj54v5vi6uoX0KaAsC+gQXgzAJkr8sZvHK4t/HyUsip18mx4PRU5fRRU01cSpKq2qRGplae3SBjO8U4flqYp0tLiq5BLTLADSCdMgAEsImPjbEOX4iEBNKrpWDppvJZewDDrc3+GIcpx91EVESqNQPOL/AAB6Dbp+pxzrFltuLN3kxaTROvsq49SYA0gKWJUnVsQqzMXG5E98BKlIK2g1FDzEEMpPSbiIm2CFXjdVqhqMSbAaZMADYCDP/k4mzXEngpUQhXioshQwkyGEpzbG5knv1xbXqE7VEp4GqZHwiu1BvUDKQZR1MiFNgx1ACJDAeQRjcZahTaiKoUiZNiCT3AvEW84hyaNSEAqdcHlEhiJkk+bXj6RgTna+beqKRRQoPMTOsACANyIN73sOk448k3N2+zoxxUVSCnE+EUK6LpgHVymQCxiSkat4E+L4G5cU1rSaWh6bEHQQBIjt+UwAR3J74loZbX/nZgwCfdCBQVBUyGVrDURviU0w8FajVCQGDHQbEzcQo09h569Jt1TKrdovtniQoVNIYlVZYIUQ19Fi4DDp9sZXK0GoNU1s2kq1RgqtYgjnAj3XmSBN798H6PCawYOXXSuohWQuC1/ymoOa52gY5ToZks9QejDBQ4COGIAgDcwLnbEopv6ATN1kaolWjl8xUqAAPNOpTIBtKuQosB3v089zfEASDUXQpFnZkVTsSJLAlrg7focWc7RBYhuWmsyabPJHXc2n4YhylHLMGZKaerF2K6yJLaec3i3Q9DBOGIrtx6gV1UgzMk2Smz023nniFm95+uLy8TrgUgS5EgkELqQmdyp6dfjgRl82allyssPze4qMLHpqYCCdQkHbrGLWUNXS3q1KZhrkyijpAMS1/AwkgbG/47TGY9J5Um2rTCyQSINuttvgcT8V4stAoAfeMwXRJ2JMuQDvGLWQql0Kpp0uGU6jpW8A37i0HAlcnJK+oakEqS0aKZkCB+8SR1JtF+9OLXYlJPovZmoWCuWAO4033uYI3Wy7bxiZczUMaQHBDalMXHXm2HXewiDhlBKaqF1QiqYYSdUdB0J8C1u8jArjPDiCz0c6y6oJRgGTb902XqO+3fCGOpBqbmmC70pIBcoY/wBSnY81o6b4D5jjo1SlAB1bSNZmHA0iE3m8dNz5wKqZ7N1n9Cm9NunqIsAmCYn947WG8XwY4RwJaMOZZwQSxIveBA6CDPxjthCAtbKNTqGrmypzFQM2mRpXVyyxWTb+GBax6YKDhCO6q9amz1FBX02OpxaefooUqIMDmjfar7T0nr16YQAarauh6yTsdzEXN5xa9guJCiczSq01Dj8QswhmiZJY3t4/exN7Agr+19cotEZRqNIRqCayPTJh5WLDSGU3AmdsGnzlOqnqLDdADTKgjcHQVkDeDEWmcTtVehSevVqKjVQHadLFRp5VGkyYEWveTAvFKsNICIzO9SDTVlFtgWYQDoXsdpgCSBikMi4TwenUPqMhY8wI3F5H3m5n6CcFa+RenQf8JSw1MEAWnBFwTPuqJMkXNgI6GeBvTp0/TlV0tbVOpx7xv3Mm/mO8h349SpV1pmdbEwQQdMHUkn5xfshm92IprwLisWy+SjpIafnz74WLw9oO4H/3Kf1xzEcgpfUzYx0DDgMOAx9AeUNAx2MOjHYwhHMLDgMdjAA2MdAx0DElByrBhupBHywmNEWFGLecrGq8hApPRRuSZPkkk/yGDGR4DTNMuzkynL+WG0ktPhT8Ou+M5ZVFXItY23ozowQzVYOoJqCRcIEiJ3E7aRFv5Yq0sszSVUnTE+JMfrhroRYgiwN/Nx9jOKaTffRKbQb4TxjMoqoqLURSYBH1AcR0PynEHEs/mWD+pqCs0m2x3C6t7AjrgtWyT01p5dTDFSyO3u6jcgX3Ewdt/niShxWktEliWBg+63vQOViRp1i++1vlxe6ufjGzr9t8dyoB8N4kyqKRXUhM2HOJ7Eb94OD/AAjOg1AgVi0xBQ9p5gLhfJ+HXA+jngSpy6L6qsQs6U0rsqyTzEgRebMb4J5rjJWujMwA06XF7WmJ0kSIFpt8sRnXJ/p2Xibiq5aL3tA9RRTIBGptosCPzdovt9MV8nxcINNSoWgAs2kDflEj5ddsV6+aq1qcDQxuwEFRpvGliIkwBeLnGazC1GBPvPctTGolNwNXZQe/ynGeOMXqWv5LnJrrf8Glz2ZBHINQYhV07uegWN/n0uT1wGyXAjRf8doMCoApOkidgJAJEkMSDClY3xf9naNSnqaoqORKkajKqNlQFYBtBIMkrfYAGq7LUB1UyR+WZtsCOwG/1GMrpmvaM3xLMlNXoupokiFYydRuTpFpB/0gx1jA/h2UqZioASSbSTvHy3MDt0xZzXC3bnVIWBbad56RNtsP4U5oEu6kggqVi+9iDHcb47IqEcbcXs5JcpTqS0Ehwz01FPWJF5ZWAgkAkD+Vx+uBlelXLMVTSGuIFjsLeesefhgk/GBrpQhIlpJEBwOwIE+ZwRfOVGU1BUGnVBBlTFjMwb7CYxhbhuS7NqUun0ZalXeilR3qLCMdatBDbbqQQSZIkEbfUdQp1s4wLO1OixMUlMNFgJfeJBt0BxLXyxzT+qBGXpufTUWWo6+8Ta6iPnfFujnUjTAB2kC3y6x5xMm5u0ONRWynU4aVpiKegKQQEIAkEWmdRPKJsd5wsrmvXQjUablGvBIBkAEdDYg77g/OTi2ZApsJOkjUStwFBid/Hw3wWThIFEksrTYLp6QPzTDXnGZegDwiqEWnTE1kBI1KYIUgteeW3uxPUYk4pmfVqrrXTThQ7WGlFLFVJUnl1mw/hI2xay9GmgguEVbk7KFEdeg6bdMVMwrVTXcU1qM0OqgFSVWwsZN4DCdtZBi2ChktJi0hqjBRpv6Yje4SQ0sf3rdIBviGhlFapVqei5moVTUxIi1ySYMm0dNItgd/i2ZA0oqq46aTrSAN57TEeMDcx7TZpSNZFJRpBpBLwLkwwMyCb9e9sOSceyFJM2f+DBWBdUVDHMsMZIsNRWxmO/WDvgPS4jkwop+hrKgj0VAb1GgXLwVi5JMnfbvmeJe0VSqV01Gi5sWQsW3EEkR067nvGBCPUIGnlkdTECb9B9MTyQ39iQcGP/l7/wDbhY69V5M5tZ/+lP8APHcV4k1I2gGOxhwGHAY9w8sYBhwGHRjoGADkYUYdhRgA5GFGOxhRhAS5Suabq43Ug/TGtHG6TaWUKCoLBYHSZWNvgN8Y6MKMY5MEZ7NceaUC7w+HrgESrsdSgnrJvNzG9+2DftBwsM2uCru4W5hI0rfrEecZkk2ubCBfYb2+eNhwXjRemKIktoIIJPOQO/fGOdZItTia4nCXiyKtWqGslEJDLADsYU7iwPX5ydsV85wIrKmo2izlS0DrzbRIBA/nh+WbVW0uugwrBi0sNPQzNzexNvjbBTiGVpmC7ghgYUkAaW3EwdgQSB4xxc3HaOzjGWjMU/Z+oQCXRdQkaiRY/L4/TyMDRRbUq+m7EmBpWZ07wdjEHvjbaCVGmmHRSQlTVbSbWAAIAuLCLYrZeg5VzOkDYy0JeyrcQvKLCN8bL1c+mjH+mj2iHhnDqukUqjtoM1NAPKvWDYG/aw7zfE7VqCj0gyKsspCNBBPWBsdu22JKVAo4ZXYsQBYk69v3iY2Iv8YxYzdFllg2i4JdTPqQCsAAiOx7g9bRynSZ39mp01J/aqgIGtVDlx5/zFN+YmOvTz1uLhTqqMlRB+6QlUkRHKeVu26/M4vVM9yudVQEWYRqtAOqbwPGw8Yj/wAeoqGarXQVSJiwt4U6rxNt7bDq2Ijo+0GUdWQP6R1cvqnRqEAydZ5Zn4GMWmzoKABNcrNiCCLEb2g+cUqXEUdgzq1aQSAEYi1xHLpJ6z4wNz7FQ3p0SLyW1eiovYxBLCZvBFiPGD8AFM+QVQsLLNl3NiTDQTYKWJI6YDPn6uZU0aJK5cHS1Qk6jcyqDzNz5jpiotLOVUC+srUTILL+cbFQwEkflJAAG1+lnhbfs34bLAl2ixK3PQXiCCLdI6Yq21RNLs0FKgiIlNVUKnKfLDpBHu33Mk7d8VeM6AdV2bTqIBkQOiwO0/TFatl3ralGY0GRJQBm283vtM9hi9k6K0KKjU9R9yxgGLkCAB9dzfApU7QSjapgzhdZFqt6g1rCpoI0sBZwSpOoQXAt2O1sTcR4gz0waWlQFIVTHyg2v8e+xxF66mozenbU8TBIMgMTf+AXtthubcFoUEjTqnYSOhMyT8JxKRQNz9dKi+iwQkwumC5UC5bpEBZmDePjg3ks6lI6EqiHaUfSQCBKiQJmwF56dBtnMjl9IFRyA7OUYlbu9S8CZhV06YJ3nFPPcRq5ageVVJeKQYCVBLEi3QADqb4GAT9pfa/VWBp0yfTkOWWdXSAdxvuTuNjOMrx/iqZhwVWFVdiRJJF5PUWgD498DBxJiSzcxuTquDPWOt/1xXqZstCm4LE/Gf6R3wuVkskp5mSQqxA3A3wyo5edJIgatrffEF+9h7pKzt2/XD6NZTqMN25bAGRc/ObDEpbCyWixCgRSNhcmmSfnOFhrZGmST6v/AOqfv6l8LBaCmekgY6MdC4cBj3zyRsY7GHRjsYBWMjHYw6MdjAFjIx2MOjHYwAMjCjD4wowBYyMIDD4wowxkuXzLK2uZMEGbzIgzPjBrhvF00hapCgW90livbVB3+HQXwBjCjGOTDCfZpDLKHRostxlFV/RlHYEAaZJJ2gDlm84GPn6hpBXqM0E3srGIMMII+2KVNyplSQfGHpWOvWeYzJ1X1fHvjF+kjejZepl8lihlqzGUrVlh5cEK0apIIlBH3GLYas2sCoxKkBdSqJ6knlkLYEgRuMM4fmlViSqKjJBUTFjtE7+TOLtQ0nhKJ0sdTTO/eQbxEW3tjknj43r/AIdMJ8vkoZnhbaxVq+oVjmCOUCjblvEfEdd8QUK9JKzeguoab0wtoPQyCSb7g9N8EuF6GV6cmGAswVQJB+uwEdIHyWUy7U0Huqq6tYus73C9VMRO9jt1UXS8hyVu4gvP8UVaStqMFpVX3BIkBYXmAO2nV2ixxXyiHOVNebDUkXaksnyS/W8WWwAI3wYrmgaw1PrdVK001QEJMFlU31dN7AGIEzeGcalqUoEcCSSASQwIkb8sg/TxjI02DaaekroKTleUguVU/KGMT3nriP8Aa6hGinlaZLA8zPOmL+9pFyLQs9sRZ7irBuWkXYjrIQdAxOwjsL7YlyRqVh+GRKAanG3+m1+o7DFVJL7Etpv7lPOio8eq4VjyxTBLWAhV6zaSQP1xLluG+lzhRS1D82p6j/8AMSxA21QJ3G2G5dwrO6sdbKYJEkfwyDAWRsPGOcbb1EEvqdUY7G9pHXaJ674VP4HaKWXVNIqA2sX0kmZubDaNR2xLW4lTSNCFxzXglQbQGI72Ed79MDP8aoIyIRZrVCZ5IBtHctBPaD8qHtNxlUUeiytLA2IaLbmD189fsnoV6NBwpTTtALdNREEmbyQLmSfrvOI81w5qtGqC5OmQBNwIJJtA6mLdes4ynCOILVA1lAUJIWdKwREkza43uLkRexqhx0AIgUEtqVg3LqAAMqsGRMQTFxjeONOPfZi8nl0YfjPC3om8wwkSpW0kXnY22wzJcOetamoZgRcGD0PW1t7Xx6BVyVCrU9RjNo0sIVR8Igb4oV8nQJ0oVeDsi62Q9pAJHzIjAvTNdsXvJ9GazHCqylgyyVCkxeZmNjf44H1ciTfS/wBQggD94+Ij+eNNncm2yZdweaKpqFmkDZUBg7bH6WjAfMtVa9Ryz9AQC9jEWAgz17WxMsSiUp2DhkKhuEpx0/FXb64WLL0ACQXoqZuCDIPY+RhYz4SL5I9NAx2MPjHQMe2eUNAx2MOC47GAKGRhRh8YUYY6GRhRiSMKMAUMjCjD4wowBQyMdjD4wtOABkYclIkwASewE4lpUgTdgo3LMYAHfBSnxqhSAFOtSgQdzzdbtPz+Hyxz5s6x/kuGNyBNTLOvvIy/FSP1GHJWhCmlSCZBIkr3j4wMHF9qELXdANoHMDMDvO9tuvfFXimUQqK1IqVbcDofA7b/AE+mWP1KyPjJGjxyjtAhRi5mlTTMjVqtB3XoSOh2xDTokzA238Y7lnH5RqYQY+cfyxplcU1JvoMabTjXYsvmmQECIMbiYImCPIk3xc4ZV0gtqYEmDBF4veQe5viuxLNZNC2UkwpvJ7m/+2+J+F0DZmhU1QdYJJBESBA7j67CMY5csaf1NceOVr6E+aFY01qcoB5oHvECBe0dNsD+J8VBBpu2snooIbYyoB3+WLXEMyUXQHJuFWx2F13i/wDLxgS+XAflJJmWY9Segm+kSft5xgnaqkbVXyxxyjRzMdJF1tHQwxBhhPTa3XFvIEE+mYCtY947b9cQG++I3CAEFQSRy7CD3Nxbp88dTjwg+ZzcuU1xC+eoLA0QlrapAgDt0N53jATi2afSfTCkP+ckgX6yLRFztEH5Ws9U16qSkaII5pJEjYE7/wAr/DHn3E3Zaa+p7vuhQI90CDckz3nwNsec2dr+oaznA6S0i9V3NRkZ91KBonUIiRNpmIPwwM9kGybLUp5jQGJBUuDBWDI1bJBAMzf6Yzw4nX0eklRtF4Egb733v2nFZLEdrA4hsVmo4txSmtRxlm5NKIxuNZ/M0dCYF4BtbAnL1fTcVIDEjmUgH3u3mPnOKhAESTeZHbt/fnFihmFXZAwtdpJt0taDP38DBCbvslqw1Q4rQqmmr0RqLQxaAirsYIv1Fz9cHs/URVim+kkcpuUAt8gT+k4BZDMB6cnLg3MFBEKADzX8AXk/PF7g9N4Ig1Kbc1xouSxIJ37R9MejCTaOeSVlnKcSOovq1LdYAPLcRG3m0THWBahxvix06MvSS4PPIY3Mm3Qze+1sSUkp02JZNNE3HMRpnpPcjcSTv4wP4pWpPDUguogWkzO0C1oEdZJO2+IlJxjVjjFN2Z/9kY7ok+d/nffHcEEyiQPwahtvoYz5nVhY5qX3Nz0gLjunCqslNRJAEW67YaMwJjpEybfLHrLLGts89waHxhRjtGoGAI2Pyw+MaJp7RJHGOxh8YUYYDIwow+MdjCAjjHYw/ThRhgMjHQuHRhwGEAB9pg49MqeWWBH0g/HfA/L5Un852kSxm4j6n7xg17UUSaEj8rKf5fzwB4Xw0lwWqsELBiCwACjmO58bfTHneoj5tm8H4lnOcOdoCu4J0nqWCkyZCz3nr0xaoZ+qKiUXMoq6V1AgiSLSIJ3iGMbWsIte1PD0as1ShmiiVN/TqRoKwCCAZEiDfFZMqpzNBVsEQlrzq0gaST31dfhjBK2jRPTDtMlZ02mx84apI2xKRhsY9bivocts7SqkGd+89en6E4nzfKLpZo0g7EkAj4EeRiBLEHfFpnLiANpa/SOg8eO+OfPi5NUvyb4clJ2/wQvUBBm5g7yVE9gdvjuSBh1XLQRJgRv8u/n+eB+ZzyI2kyx6gXItM/f74bmuIsHCfhknWVQc3KYI1SBcg236HHLlyxwvwN4ReReZZq1lXTdJtGo2PewvtP2wEDO9RvTMkrOkqQW0TPN0M3A7HxiZ6nOhFHU7KRJMC8bE7ED++1HiftCMvUhblVAqMNJ1fmKoYvvGo338HHn5ZTy+M+jZRjHoiz/F8w4DIhQW5v3j4bTFjjJ8RSq7TU1Aj94k27jx1tjcVOPLUosKUnUvLKkBSIIkd5AHXf5ENzkc9RQAfeMz8NxaennGc5uMqTtAyDjPsmKCDS+tiYkKecm4CgE3ABJnze2M7TAE653kRte8T8P0xq8kabsaNevMAuh1aVYxABMWiST3iOs4D8eoU1dFR9cA6yCGAudu5g3j+uLttWAOqSzArabC46fofj0x1MoYLTYeP5Ed4+uJsmApEN31giwEEEgg9jt+uG5rNXYaieaZjqPnHX7YSvpAcyr1EPJcTeTpuN4O4894GHniLlTBaxk/iSJMflI7KPPnbEKV1MmoTHiL2/qBOJqdFWKkKXJ23ABvHg40U5VTCkVE9RzAAvA2jewF/piepl3pxro2hrKNQbTJJLSSAL/TF1cqFGokytwBG89G2mb74MezntK/qCm2XFUmUsRqYEliSpGkldwSR95xUXYGXFHtTPy9SMcx6NmM9T1NNKsTJk+g5kz3Ag/EYWLr7ipFGgXqONTaadyBG07CJmMXlAdop6jLFSW8b3/kMZp841oJIXfoB2333xd4NxMsxAq+mokxFo67/DpjLBm/taIyR+UzVUcmVKktqgEbRM4sacT6LDDSuPfgklo89tsi045GJdOFpxdiI4woxJpwtOCwI4x3Th+nHQuFYEenDguLWUyhdokAdSdh/fbBWlXytOVA1VIsWAMnpAmN8Y5c8YaZcYORlOO11Sg+pgJXqfv3tjB08+rrEgEgxqHS+399cXeKuWDAzJRyZ3mDvgRWyv8A7ckbAqQBfrpNt+oxyZ5c2bY40thfK1hTQhqi6TzC8X+GDvsRTFarUgzV0SqkwdJIne3RfrjEZHhrVXAjkF2HukjwBNzj2b2P4QtAtqH4pSGPUe42iewn6zjn5cGmXxTTRUzGWdDDqV+IxCR1xsmz9OdL7ESQTIj4YH5vh1CqNVEw0atPf4Dv42x2Q9XfaMXiPP8AjfFylenRUNcam07wbCLX6mPGL9arXpHUCGp6TLHlMG4gblrdsZ7jOby/7SprjUkNeI0xPbe826/bFniHFGqLFLUwbfVTZDBHwi5vqAjzjgy5rbk2dkcaSSCtKlqAzCqUaoAWBMiAIgR0sL36ecR1836Tl+YsqzETE2mOm8T1+UYgPEDoPqIPUEaT6hA5QfygXO0x4uelT2frvUYsyU1EMWAB5msJA6GR5tbzjBZYS0ma9D3cMGf1DBXlQMQ4LdDtfpbvF7yJ4zw71CqPTdPSGnWKTFSbErpA1RsQwBuSINziy6kVi2klUaRFrrBAHZpEx8O+DtDOIzgnrdmvA63vN+2FHIt8mhUYTiecp0yctSUuF06iARraAWJlZABMCegnri56FUoA1NtuWZJIjcAwSP7ONdxLKipW9RFVBAmFKkyem1twZwN4mGhgpueXaSZj8xM7+Bv3xzZM8OoMfEwei8CdUx9f7+2Jq1MKobUDMwRvY7R/PBHP5OmWtCsZ1LBhY2A7ziTI8LV1qAk+pJVR0O53vPziBjR5FVkUBWcgkA2O+nqPl8cQ1SLWP9n6/XBSrlvSBBiSI+cTA3kD+/A3MqAoA36kGRjWLT6AucLdZYMUUkWlJJ2tr3UG9h4wSy+bSIB036woO3YbWmw6/UFRyjMshDAMajYd+3kfUYfnM5U9xgRpCiCLiLgye4M+bYbimOyXiedVSy0yYnfrPUjqZt9sXfY7L5jU2ZAU0lBDEwCdMGBF9QMXMT5wFy6tVcIqGo5NgJPk28AfbxjXeznFVpUTTKmmyajUDBYEmQ1yItaI3xrCNCrYY/8AUyeB4LXHx598LGdbMoCRI/6Z++q+O4qmPQLekGIjcDbrtN/6YO0M7WUUyoAZLiAPzWg2nzf64opRb1Aophn1roHvByTAAjva2+3mdZlfYXidRlLUVpiCRLIoWTMFQSZMDfuQcc0XJ7iyWl8kGQeuHV8xVP5mEXBnZZiPynbuMHeFZd+apUN3Mheij+tsMb2O4kiiFpMFMiGBcAdOa0G/XEeQztZyF5BHvGLADeLwT8J+mO30+VKSTTv/AGYZItrQWK45pxHka7VJbSVXZZ3PnFrRj1IytWcjVEOnHdOJtGI2qKDBYA9pE/TfDckuwpsbpw4Lhn7XT1ada6u03xK1ZFIBaJ27fXbErLB9NfuNwkvgznE+KsWZEIABZe11Bn9MZmjxF0q0SSY1Kd/P+2CFBgxZiferOP8ArR4+4wH4qYpgDcMv/wCL1B/MY82TuTZ2R0j0VchTzIOtBJSCwALCYM/33wO4V7DVDanD03Qc7WjvPa46Tif2bzY01WVpAQn/ALB//OLXAePVKakaiVCWBuNxtjO5K6HSpGj4R7H0MsxeC7wOZth5AH85xzKZjTWcnZmqAnt7v9Bgfwr2hZgULSdUAn4H+eB7V2YXuxqVhbaZI+mM0neytbQD9o+KkABTsBJBB3EdDh/s9xZ9y55evSxgYB8UQF2tZbfp/M4ucGRRTqFjAXSSdgBMk/QY2JHe02RotWnUlTWS5GkgD4NaD7x2nEWTpZnMp+ABpUsCbCYBMCTJP6Ei4E4hzYp1F1q1U6g2kKCNQmZgi8R423xJQzdTLKiUiy6oJMDYAGTIO5JuOw26eZNweSns3V0FPZng1dM1TFWlrQo/5hpAAjmE3gsNt5B2GNBxWjTDOUT0lYKWZDGkwogDYG2qPjO+M6ntLmzRKhdQJBV/dexU2AYGG6CDI6YrcW9rGAWl/wASTEEaFL/uxvud7j9NVKEV4djLXG6mXopqC6zHnmZtjJNpsSeu+BVDiTVAxWOVdiTpk/HcbiIn9cCOL+stPU5PvSn7wM7mTK3iJ7YH8PqNUqhA7ICQzEEySt/jM9u+OZ4vcTm6E5MPpxVnpWMNAEybz0IA28+cTZOq2j/M/wBcTY3F+xEi/jbFM1ajOIpEgGCmkRDQBvA1EgRP0OJquSdCBoUUmmad7seWO7QesTBki2M3CPQiDi9dQSX3K7kEkCYBkW3ET1PxjAT9pd+VApIU3C3gXkHfbrt9sa+nmhRVabXldQgAILEcxLGI6wIFumBOVzH7O75lqStrZlYkkcrENAGmCfd5rgxjowS+KEZjL1alcgB783Ww6yf9sEuF5ADMrTzF6YcqxB0xuAb9JF7frOLfEc7Sq16j06jUiyU4I5UJTUCGAO0RB6R5wHydevUqfhElzeRA27ttB2uQDJ7nHXV9LQM22Z4cqg0sk4eSKkhv8tgoA57i9wFsSDvbGdzFM1s2RmUBdwpCqQUYKovrBsIW56X7YK//AA8z+Yp1qtB6blXEPIMqy+6Y2AIMXmYEYn4rlFp51asBVp04NuVSJNlBB2J3MX2N8aUgBuWyNbKg5ijUpFQjcukiZF1kxMwAHET2vgX7SDSyVpKh5IaSSbA6T1BkzPkxtjU8e4w1FeaitwQjCIA6CLj3YNpxhsznnzbIp0jSAqKCEWTCzfrAFvGKEwY2aYkmFP8ApU/qs45h7UqUmahnrCSPkZEjCw7A9AyALAAsCYkCD0G8/GT8sd4jn3aUqVahCLynU3LIJgAkm09IG3wxk6XEKgbknpMWvPew+ZvfF4UizTLaYBAFzF5uP4hjijgaldjcg5R43mH003q1qiSAgLF1HzJv0GDuS4o9JdAUEDp0H9/yxksrmXUQhEkEiekdB5PjF18s7UUd6ksztbsF3G8EcwjaJOIfLlyi6Hro0NP2nqAnlVhqJMmNIiYn4m3jE+R9qg5aQBBJ7QBFr9f64x7ZiTp0RqaO1ovcbj+5xOpWIAAgbxCz1v8AKLd8aL1OaK/UyfahfQczntgdf4aLCFtUmVcdPlbpM/bC4XnKVSowVWWbhmaHJJI7e70j+uMzVU+9Yx0Gwnrv9vj8206rCLzLQCpvMxPe1sS5N7KujY8VySyNRIBsDIJB8E/XAqhnBpAd2ZJBIvF+sSen88Va/FHcKHInSVURJk9enbfe2GVUBExI0m+21h/WYxN7G2mXuDpNIMf3qTxt7tapTafgHT/qxS9oqOkVLe69+14br5bEns/XAHpVLBw2g2uHASogJsKgaklRZtKxbWDg97RcNLZavUamwJpioRpIh6YltxOl9CsvzFiCMeic5W4C5CkKCS+VcgDqwl9I8w/2xqeAcMdqTNUVaSskQQC31BPbrjD8FzuqjTaSNDXI3Gwt4hlHwBnG5o8TSnSKt6kbgqOUCLc0H7wflBKl2JFzI8LamoeiRJBJUgAg/wAJjfwfrgJTaoiF3XSfUr1IMGymJOkn836YK0OM02pj0/W17WKn7FcCOJVtaamOnU0BQQSFSWPgkGGPTUQJ6mUHyzLenq1m+rmPTqwj47H6YK0MqtNXZoIWoFvBH4YOr7jEnAck1QyE1H8MKPyyssZP7smSe2JOPaKNOpRn3qLE1JkiW5rD/iPIAH5Rve2CfToZn8hxYs7IisRIAHRVUbxHW1/PWcEM0mWCQYidtQDEiSOYCStthilwWnopay6FmEk6rwAIUnqRvb7YH18xYdFFi6ydoItJ6nt18Y8aUeU/E6r0H6HEA3KyFTMyOZQfdF4sDET3AwsxlC1UFgsq2vkEEn3mkg/IxHW2IMjXeoPVZgUHvjYi1gR1iZgROFmOIqshCgC3sRM77wRufPwxlxalUUDetkPGcklSnDlgAJUk+7PUiACLbHFBeB0hTkOH1IdPLDEncGTaNh/q8YLVK/qIpWTcErEkIbyzMZ0gnfxA3wKr8AqM7lTCAAyW2iBABIPnaIG5xvitKnKiX2SZDiC0qfpa4cSpbUSrXLA9xZgCNp8XJKiiMhLOTvB1MdGowDe62gT+gxkuLBkqemIDkgcpkHVaRbqD85OF61Sgw0GdIIJkGRJ7Ej/YTjSWBS2ntk8g/wAXomrKU2REj3tgemknVGnlv3jFmtxFFpCkhLFOpkzeJk3swI69cA+DcSsQ7QhEEiNRJ6idiN5EYq0s7BCilrL8sEwH206YEz8zv5xeOMo6XwTyLfFeHq9elTRdAZdLckbrrUnq1gT9PJxRyeeOTzDMrEygRpQoTJBIKzJIIER9L49GpZXMtk0LqlSopqEMr6nTVdT/ABTqaTqFjF7nGG9pnWrFFVL5pX0M4QfiBS4lXnUP+Ug7C8XPaUw9xeqpC18tXl1JLsn5hYlTAiYA3HU4z2dzGbr1lAUpTDBmaoGCj3Z1FYmNQa3T54HZLIZgSieqtRAdQDRcNAkgxu28/bHoWQqV6eXpUQqNUCiWm0KNO0XI2IkYtAYDitfNPQVKugoDpXTAI06o+Igbjuvwxl0cwRO/TvH/AJxofafjNWpUdG9OASsKsAEGCVuSJgYzxpkNB8ff/wA4aEx4pHsPvhYecq/ZvvhYYGsylJWDEEHSLxpO0dZ3ubfDBbIEHWKZ5aalyANIl7Aab3Frd/vV9keI8NpD8fJ5mpWmQ3qhkH8WmFFt7q+2Di+2FOrWdWycnRCl6rePe0he+wIjzjBRSvZLbekgPU4LS0mo1So9SbqCogCdzeT4Xa1+mIWzEpYAIo/dnp3NyevecWq2XGtpQGebSpMC8hQSSxBmLkm5xygruwbWioBBWSCOsWHT4zbHJJ2zQFZPMm8mVNhJF4+2HimxgsI6wpgEibLG5g4J0vZQklkqUwJPvEzaSekmI36QcSj2NqgjTVpQAYlnN7zso/dPe4xuoN7iibBjZYuCfdIiSLSNo+Jg/wB2xFTsCIFgAQTsRa5Pw+cAY1OS9mmUgtUVrgnlabWsRuLduveMEstwcoLNYHUv4bwpkQSQQSJNwTBnE+3PqiqTMXmaL041rqVpKGJBj7SDv2tHbEKVmvc3DCQIuLX8H499sew8J9j8vVQPUD6SLU/dBmBYwCqnqqx5wYo+w/D0n/2y+ZdyOnQtjT2n0RyR437KZGu5imCA5I95irMBflBAsTBN+vwx7XwPKhaYpMhbSNJlYG3wgg+MXn4YgQIjvTC2UKRA8XBtihS4ShGr1agDdNZUQQOikAHHRZk9mL4h7E06Luck4FNjPpu4VUZZlUcnVpIYjYkEWPQUKFCtS0H16NiQIr0tYB3tIi0e7UAt7ogDGg9rPY/LVCKi1fTYbCNdJiLcylpn4EE9jfAbKZEqRSbL06gF1F1ANpIEkkGOp+WANlnIcPruhUPTdjfnzQ0ibTpplmN+msT1xfT2RDladaoRqXSGXSNemDppgEqiLvpIkxJ2M3aXswrJztSpM37iS8AbamJ2jtiXLexuXReatXqaPdLVCAvwCaQPjvhD7DGRylPKoqUaJK9Tu89SZuf7jHmn/wAT+I1A7oUHOAoJ3A3v23t0kN4j0CjwLLN+I3qDV3q1BIG080md798OzfBMo0yiAGm1NrBmYGDpLmTHLtiZx5VQLR4j7OcFzNcaaZGllaASC3LLAAXImIthDOlNNJgSacEgAaiRMyYmwFge5nB3h/ti2XzZVKZXLAuGpMxZybqDrJkMCoBAMb/HGgz/ALL0WKZvRWHq0wTTDKTTOmdJJuQbb3nfxjPDfRopNHmdfN1/TNRZbmuJJCz1f8pNhcidr4bwbM66gLkBSCDN4g6rSZF5AjqfOHcbpDLV3pQwRWCmSAWVhGqAYJuT4+uM3Xcg8pvysACDJJ6wfAtvfB7LaaHds9LyudWoGVWNIMSRESYGkEEd407jrjtV2VSsk7gGSbEC/LMEX6HYGcUaPAmRNdZTTSxZpBYGY6GYF22mxnpiTLenVZkLFTy6KhA1KRpKs3RjJiBpsIv04n6dp/YqzN53JBw7AVFdWb1C4hRFgOsExsTNjbA01QFgbk3uZ+fSPO98aypTSoUVTUq0/wAOm83PLEkmJDG/yVSZxlqmXhzRYw6mCIjsQb/X547VF/JFWNWowtJAnvsOb+uw84j16GDIwOkgzOnYjaevj7Yq8UqEsR2gfIf2PrgxwLgZrv8Aj+olP0xU1AAHSROoBrMALW7zsINqAULP+2GZqEMH9MhShFOVDA9SJjV8AO+KGTzNQOKisQwm+5Egg79wT9cczWTRNS85qh1Ke6UKEAySNzPT7bxbyHCjUou4Ws51KBpRmHXrG+1t/GLasZJlfahqdRn9NH1DSwbUdQ23O3w2sO2IuK+0NWrZHqU0P5A4gbQBpUGxHzt2xNX9js2rKXpxqIABZQx/0Bix+QO3XFDiXC6lItrR1UHTJUi5BIF+sYfQiglNjBAvuTbv/XviznECVeZg8ourSQwmdgRIsABitUDadjpB3j54qOxxSALf4lSFhTMeXv8A9uFgUK7/AL7f9R/rhYdgeh0eMUuZVWTEEkWB2FgsEEA9P1xWpZRqjHSGY+FJ1eY7Y5hYxx4lFOgk3ZDVaoiEmm4MgEt0azCfMXjBDhj62p2IMkEz7x31H59/GFhYycFoqz0fL5hFRV1KIAsCLmw/Uj6j5O/b6X/zEv8AxC8gR8uZfqO9lhY7OiRNxGif+Iv/AFd79Ol/v5OK+Z4slNHfUOVGMfAE/wAj/cysLCsKLfDuPtmqDii0Pohb3BM2Hk3juUPfED+2QqBi0rqpaKiCddCoJBlQC5pNMiooMFBPXCwsC2zNqipR9tK6nmdQwUKzSrUqkbPp1B0cjcR/sTy3tIEpAO4qJWLH8Iy9BiTMKTzUibi8ieo25hYGNRRV4hn69YCqlVUUKPWJK/glRDOyPE0rapBUi95MYj9BF0vTzk02IBanSpsWkC6XMxe0E7djhYWImnd3/guCW0FaSVKQmdasLSxd6rfxPACU1P5QBtF9sWquYY0oFIpTUTUappNWoR0VFLABjuxO1o6jmFhkS1JoEZrO5s6QCtKLe7Li37rnlPk6h4whmqwAhJAl2LMAKhEHmYkudhMKZgCVFsLCxbRCZh+K5itVzf7SWU1BUpHSFtqQggDxb/ycbfM8Wc1dGkatExaxiQCZv0E9cLCxLZqkeV+1HEi9Q/tKhqyD0yVQAWMnZri5jffGdatTF1WGEEHTsQZn3u3g4WFhgencPoVs3kUFZ41hWGkJddxI1+O3UdsQcO4HpqaqyqAtgdakVOgkT0Bv+lpKwsZ0mXQW4ZkVpFnGqoXJbnK3mIFmi0xP/N2EiPbfhgrBMyiRVpyHHLzoRBkgmSJt/q8YWFin0JGCYotamaglSYa8WblP0mfljYcDo06uULH1SwpjL8i6kGgsNRN9OoabdebvOOYWBDYD4PlQucfWVT0iGGt4iDeGH5tjAU3+F9h/6ky1JSBUJF7Ux6QPeXM1CbATaYGFhYASKGZ9uBT/AMqmqahMrEtPdzzE3wB9oeOVayJLAhl1EEBmBg7E9r45hYmuhsBnh1R1BiR05hNyBYdv98Q57hrUwC4AvG9x/XvIwsLFIkacgvRgfrhYWFhgf//Z",
    mapLink: "https://www.google.com/maps/place/Great+Buddha+of+Kamakura/",
  },
];

/* ====== COMPONENT ====== */
export default function Places() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [flippedIndices, setFlippedIndices] = useState(new Set());

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
    window.scrollTo(0, 0);
  }, []);

  const toggleFlip = (idx) => {
    setFlippedIndices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) newSet.delete(idx);
      else newSet.add(idx);
      return newSet;
    });
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-pink-50 to-pink-100 min-h-screen text-gray-900">
      <Navigation />

      <header className="relative">
  <div
    className="h-[240px] md:h-[280px] lg:h-[300px] w-full bg-center bg-cover flex items-center"
    style={{
      backgroundImage:
        "linear-gradient(rgba(220,38,38,0.20), rgba(244,63,94,0.10)), url('/places-hero.jpg')",
    }}
  >
    <div className="max-w-5xl mx-auto px-6 w-full text-center">
      <h1
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg"
        data-aos="fade-down"
      >
        Experience the Places of Japan{" "}
        <span className="inline-block ml-2 text-4xl md:text-5xl">🗾</span>
      </h1>

      <p
        className="mt-4 text-white/90 max-w-2xl mx-auto text-sm md:text-base"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        A journey across temples, mountains, and seaside towns — discover Japan’s
        iconic destinations and hidden gems.
      </p>
    </div>
  </div>
</header>
      {/* PLACES GRID (flip cards like Food) */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-amber-800 mb-6" data-aos="fade-down">
            Popular Places
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.map((place, idx) => {
              const flipped = flippedIndices.has(idx);
              return (
                <div
                  key={idx}
                  className="perspective cursor-pointer hover-glow"
                  onClick={() => toggleFlip(idx)}
                  data-aos={idx % 2 === 0 ? "fade-up" : "fade-right"}
                  data-aos-delay={idx * 80}
                >
                  <div
                    className={`relative w-full h-72 transition-transform duration-700 transform-style-preserve-3d ${flipped ? "rotate-y-180" : ""}`}
                  >
                    {/* front */}
                    <div className="absolute w-full h-full backface-hidden rounded-2xl shadow-lg overflow-hidden border-2 border-amber-100 bg-white">
                      <img src={place.image} alt={place.title} className="w-full h-40 object-cover border-b-4 border-yellow-400" />
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-amber-700 mb-1">{place.title}</h3>
                        <p className="text-sm italic text-gray-600">{place.location}</p>
                      </div>
                    </div>

                    {/* back */}
                    <div className="absolute w-full h-full backface-hidden rounded-2xl shadow-lg overflow-auto border-2 border-amber-200 bg-gradient-to-r from-amber-100 via-pink-100 to-pink-200 rotate-y-180 p-4 text-left">
                      <h3 className="text-lg font-extrabold text-amber-900 mb-2">{place.title}</h3>
                      <p className="text-sm text-gray-700 mb-3">{place.description}</p>
                      <a href={place.mapLink} target="_blank" rel="noopener noreferrer" className="inline-block px-3 py-1 bg-amber-600 text-white rounded-md shadow hover:bg-amber-700 transition">
                        View on Map
                      </a>
                      <p className="mt-3 text-xs text-gray-500 italic">Click card to flip back</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* video */}
          <div className="mt-16" data-aos="zoom-in-up">
            <h3 className="text-2xl font-bold mb-6">Experience Japan</h3>
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/CxuiFNYnEr4"
                title="Japan Travel Highlights"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* about */}
          <div className="mt-16" data-aos="fade-up">
            <h3 className="text-2xl font-bold mb-6">About Places in Japan</h3>
            <div className="rounded-2xl p-6 md:p-8 shadow-xl border bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 border-indigo-100 text-left">
              <p className="text-gray-800 leading-relaxed text-[15.5px]">
                Japan is a country filled with a beautiful mix of tradition, culture, and modern life.
                From the neon-lit streets of Tokyo to the serene temples of Kyoto and the natural beauty
                of Hokkaido and Okinawa, every region offers unique experiences. Landmarks like Mount Fuji,
                historic Kyoto, and seaside Miyajima draw visitors from around the world.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* styles */}
      <style>{`
        .perspective { perspective: 1000px; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .transform-style-preserve-3d { transform-style: preserve-3d; -webkit-transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .hover-glow:hover { box-shadow: 0 8px 30px rgba(255, 140, 0, 0.6); transition: box-shadow 0.4s ease; }
        @keyframes modalOpen { 0% { transform: scale(0.85); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .animate-modalOpen { animation: modalOpen 0.35s ease forwards; }
      `}</style>
    </div>
  );
}